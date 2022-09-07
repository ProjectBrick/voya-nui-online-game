import fse from 'fs-extra';
import gulp from 'gulp';
import {Manager} from '@shockpkg/core';
import {
	Plist,
	ValueDict,
	ValueString,
	ValueBoolean
} from '@shockpkg/plist-dom';
import {
	BundleWindows32,
	BundleMacApp,
	BundleLinux32,
	BundleLinux64,
	loader
} from '@shockpkg/swf-projector';

import {
	appName,
	appDomain,
	version,
	author,
	copyright,
	appFile,
	appDmgTitle,
	versionShort,
	distName
} from './util/meta.mjs';
import {pngs2bmps, readIco, readIcns} from './util/image.mjs';
import {docs} from './util/doc.mjs';
import {makeZip, makeTgz, makeExe, makeDmg} from './util/dist.mjs';
import {templateStrings} from './util/string.mjs';
import {SourceZip, SourceDir} from './util/source.mjs';
import {map} from './docs/map/map.mjs';

async function * readSources(sources) {
	await Promise.all(sources.map(s => s.open()));
	const m = new Map();
	for (const source of sources) {
		for (const [path, read] of source.itter()) {
			m.set(p = path.toLowerCase(), [path, read]);
		}
	}
	for (const id of [...m.keys()].sort()) {
		yield m.get(id);
	}
	await Promise.all(sources.map(s => s.close()));
}

async function * readSourcesFiltered() {
	for await (const [file, read] of readSources([
		new SourceDir('mod/1.0.2'),
		new SourceZip('original/1.0.2/voyanuirpg.zip', 'voyanuirpg/')
	])) {
		if (/\.(swf|xml)$/i.test(file)) {
			yield [file, read];
		}
	}
}

async function addDocs(dir) {
	const mapHtml = await map({
		style: 'display: block; max-width: 100%; height: auto; margin: 0 auto;'
	});
	await docs('docs', dir, [[/<!--{MAP}-->/g, mapHtml]]);
}

async function bundle(bundle, pkg, delay = false) {
	const swfv = 8;
	const [w, h] = [742, 556];
	const fps = 20;
	const bg = 0x000000;
	const url = 'voyanuionlinegame.swf';
	await bundle.withData(
		await (new Manager()).with(m => m.packageInstallFile(pkg)),
		loader(swfv, w, h, fps, bg, url, delay ? Math.round(fps / 2) : 0),
		async b => {
			await b.copyResourceFile(
				'voyanuionlinegame.swf',
				'src/projector/voyanuionlinegame.swf'
			);
			for await (const [file, read] of readSourcesFiltered()) {
				await b.createResourceFile(file, await read());
			}
		}
	);
}

async function browser(dest) {
	for await (const [file, read] of readSourcesFiltered()) {
		await fse.outputFile(`${dest}/${file}`, await read());
	}
	await Promise.all([
		'voyanuionlinegame.swf',
		'main.js',
		'main.css'
	].map(f => fse.copy(`src/browser/${f}`, `${dest}/${f}`)));
	const defaultPrefix = 'voyanuionlinegame.';
	await fse.outputFile(`${dest}/index.html`, templateStrings(
		await fse.readFile('src/browser/index.html', 'utf8'),
		{
			LS_PREFIX: process.env.VNOG_LS_PREFIX || defaultPrefix,
			API_PREFIX: process.env.VNOG_API_PREFIX || defaultPrefix,
			API_URL: process.env.VNOG_API_URL || '',
			API_NAME: process.env.VNOG_API_NAME || '',
			API_LINK: process.env.VNOG_API_LINK || ''
		}
	));
}

gulp.task('clean', async () => {
	await fse.remove('build');
	await fse.remove('dist');
});

gulp.task('build:pages', async () => {
	const dest = 'build/pages';
	await fse.remove(dest);
	await browser(dest);
	await addDocs(dest);
});

gulp.task('build:browser', async () => {
	const dest = 'build/browser';
	await fse.remove(dest);
	await browser(`${dest}/data`);
	await fse.outputFile(
		`${dest}/${appFile}.html`,
		'<meta http-equiv="refresh" content="0;url=data/index.html">\n'
	);
	await addDocs(dest);
});

gulp.task('build:windows', async () => {
	const dest = 'build/windows';
	await fse.remove(dest);
	const file = `${appFile}.exe`;
	const b = new BundleWindows32(`${dest}/${file}`);
	b.projector.versionStrings = {
		FileVersion: version,
		ProductVersion: versionShort,
		CompanyName: author,
		FileDescription: appName,
		LegalCopyright: copyright,
		ProductName: appName,
		LegalTrademarks: '',
		OriginalFilename: file,
		InternalName: appFile,
		Comments: ''
	};
	b.projector.iconData = await readIco('res/app-icon-windows');
	b.projector.patchWindowTitle = appName;
	b.projector.removeCodeSignature = true;
	await bundle(b, 'flash-player-32.0.0.465-windows-sa-debug');
	await addDocs(dest);
});

gulp.task('build:mac', async () => {
	// Release projectors on Mac have slow performance when resized larger.
	// Debug projectors do not have this performance issue.
	const dest = 'build/mac';
	await fse.remove(dest);
	const pkgInfo = 'APPL????';
	const b = new BundleMacApp(`${dest}/${appFile}.app`);
	b.projector.binaryName = appFile;
	b.projector.pkgInfoData = pkgInfo;
	b.projector.infoPlistData = (new Plist(new ValueDict(new Map([
		['CFBundleInfoDictionaryVersion', new ValueString('6.0')],
		['CFBundleDevelopmentRegion', new ValueString('en-US')],
		['CFBundleExecutable', new ValueString('')],
		['CFBundleIconFile', new ValueString('')],
		['CFBundleName', new ValueString(appName)],
		['NSHumanReadableCopyright', new ValueString(copyright)],
		['CFBundleGetInfoString', new ValueString(copyright)],
		['CFBundleIdentifier', new ValueString(appDomain)],
		['CFBundleVersion', new ValueString(version)],
		['CFBundleLongVersionString', new ValueString(version)],
		['CFBundleShortVersionString', new ValueString(versionShort)],
		['CFBundlePackageType', new ValueString(pkgInfo.substring(0, 4))],
		['CFBundleSignature', new ValueString(pkgInfo.substring(4))],
		['NSAppTransportSecurity', new ValueDict(new Map([
			['NSAllowsArbitraryLoads', new ValueBoolean(true)]
		]))],
		['NSSupportsAutomaticGraphicsSwitching', new ValueBoolean(true)],
		['NSHighResolutionCapable', new ValueBoolean(true)],
		['CSResourcesFileMapped', new ValueBoolean(true)],
		['LSPrefersCarbon', new ValueString('YES')],
		['NSAppleScriptEnabled', new ValueString('YES')],
		['NSMainNibFile', new ValueString('MainMenu')],
		['NSPrincipalClass', new ValueString('NSApplication')]
	])))).toXml();
	b.projector.iconData = await readIcns('res/app-icon-mac.iconset');
	b.projector.patchWindowTitle = appName;
	b.projector.removeInfoPlistStrings = true;
	b.projector.removeCodeSignature = true;
	await bundle(b, 'flash-player-32.0.0.465-mac-sa-debug-zip');
	await addDocs(dest);
});

gulp.task('build:linux-i386', async () => {
	const dest = 'build/linux-i386';
	await fse.remove(dest);
	const b = new BundleLinux32(`${dest}/${appFile}`);
	b.projector.patchProjectorPath = true;
	b.projector.patchWindowTitle = appName;
	await bundle(b, 'flash-player-11.2.202.644-linux-i386-sa-debug', true);
	await addDocs(dest);
});

gulp.task('build:linux-x86_64', async () => {
	const dest = 'build/linux-x86_64';
	await fse.remove(dest);
	const b = new BundleLinux64(`${dest}/${appFile}`);
	b.projector.patchProjectorPath = true;
	b.projector.patchProjectorOffset = true;
	b.projector.patchWindowTitle = appName;
	await bundle(b, 'flash-player-32.0.0.465-linux-x86_64-sa-debug', true);
	await addDocs(dest);
});

gulp.task('dist:browser:zip', async () => {
	await makeZip(`dist/${distName}-Browser.zip`, 'build/browser');
});

gulp.task('dist:browser:tgz', async () => {
	await makeTgz(`dist/${distName}-Browser.tgz`, 'build/browser');
});

gulp.task('dist:windows:zip', async () => {
	await makeZip(`dist/${distName}-Windows.zip`, 'build/windows');
});

gulp.task('dist:windows:exe', async () => {
	const outDir = 'dist';
	const outFile = `${distName}-Windows`;
	const target = `${outDir}/${outFile}.exe`;
	await fse.remove(target);
	const res = `${target}.res`;
	const resIcon = `${res}/icon.ico`;
	const resHeaders = `${res}/headers`;
	const resSidebars = `${res}/sidebars`;
	await fse.remove(res);
	await Promise.all([
		readIco('res/inno-icon').then(d => fse.outputFile(resIcon, d)),
		pngs2bmps('res/inno-header', resHeaders),
		pngs2bmps('res/inno-sidebar', resSidebars),
	]);
	await makeExe('innosetup.iss', {
		VarId: appDomain,
		VarName: appName,
		VarNameFile: appFile,
		VarVersion: version,
		VarPublisher: author,
		VarCopyright: copyright,
		VarLicense: 'LICENSE.txt',
		VarIcon: resIcon,
		VarWizardImageHeader: `${resHeaders}/*.bmp`,
		VarWizardImageSidebar: `${resSidebars}/*.bmp`,
		VarWizardImageAlphaFormat: 'none',
		VarExeName: `${appFile}.exe`,
		VarOutDir: outDir,
		VarOutFile: outFile,
		VarSource: 'build/windows/*',
		VarArchitecturesInstallIn64BitMode: '',
		VarArchitecturesAllowed: '',
		VarReadMeName: `${appFile} - README`,
		VarReadMeFile: 'README.html'
	});
	await fse.remove(res);
});

gulp.task('dist:mac:tgz', async () => {
	await makeTgz(`dist/${distName}-Mac.tgz`, 'build/mac');
});

gulp.task('dist:mac:dmg', async () => {
	const background = 'res/dmg-background/dmg-background.png';
	const size = {
		width: 640,
		height: 512
	};
	const output = `dist/${distName}-Mac.dmg`;
	const icon = `${output}.icns`;
	await fse.outputFile(icon, await readIcns('res/dmg-icon.iconset'));
	await makeDmg(output, {
		format: 'UDBZ',
		title: appDmgTitle,
		'icon-size': 128,
		icon,
		background,
		window: {
			size
		},
		contents: [
			{
				x: (size.width / 2) - 160,
				y: 108,
				type: 'file',
				path: `build/mac/${appFile}.app`
			},
			{
				x: (size.width / 2) + 160,
				y: 108,
				type: 'link',
				path: '/Applications'
			},
			{
				x: (size.width / 2),
				y: 364,
				type: 'file',
				path: 'build/mac/README.html'
			}
		]
	});
	await fse.remove(icon);
});

gulp.task('dist:linux-i386:tgz', async () => {
	await makeTgz(`dist/${distName}-Linux-i386.tgz`, 'build/linux-i386');
});

gulp.task('dist:linux-x86_64:tgz', async () => {
	await makeTgz(`dist/${distName}-Linux-x86_64.tgz`, 'build/linux-x86_64');
});
