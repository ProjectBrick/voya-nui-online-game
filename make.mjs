import {readFile} from 'fs/promises';

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
import {docs} from './util/doc.mjs';
import {makeZip, makeTgz, makeExe, makeDmg} from './util/dist.mjs';
import {copyFile, outputFile, remove} from './util/fs.mjs';
import {templateStrings} from './util/string.mjs';
import {SourceZip, SourceDir, readSources} from './util/source.mjs';

async function * resources() {
	for await (const [file, read] of readSources([
		new SourceDir('mod/1.0.2'),
		new SourceZip('original/1.0.2/voyanuirpg.zip', 'voyanuirpg/')
	])) {
		if (/\.(swf|xml)$/i.test(file)) {
			yield [file, await read()];
		}
	}
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
			for await (const [file, data] of resources()) {
				await b.createResourceFile(file, data);
			}
			await b.copyResourceFile(
				'voyanuionlinegame.swf',
				'src/projector/voyanuionlinegame.swf'
			);
		}
	);
}

async function browser(dest) {
	for await (const [file, data] of resources()) {
		await outputFile(`${dest}/${file}`, data);
	}
	await Promise.all([
		'voyanuionlinegame.swf',
		'main.js',
		'main.css'
	].map(f => copyFile(`src/browser/${f}`, `${dest}/${f}`)));
	const defaultPrefix = 'voyanuionlinegame.';
	await outputFile(`${dest}/index.html`, templateStrings(
		await readFile('src/browser/index.html', 'utf8'),
		{
			LS_PREFIX: process.env.VNOG_LS_PREFIX || defaultPrefix,
			API_PREFIX: process.env.VNOG_API_PREFIX || defaultPrefix,
			API_URL: process.env.VNOG_API_URL || '',
			API_NAME: process.env.VNOG_API_NAME || '',
			API_LINK: process.env.VNOG_API_LINK || ''
		}
	));
}

const task = {};

task['clean'] = async () => {
	await remove('build', 'dist');
};

task['build:pages'] = async () => {
	const dest = 'build/pages';
	await remove(dest);
	await browser(dest);
	await docs('docs', dest);
};

task['build:browser'] = async () => {
	const dest = 'build/browser';
	await remove(dest);
	await browser(`${dest}/data`);
	await outputFile(
		`${dest}/${appFile}.html`,
		'<meta http-equiv="refresh" content="0;url=data/index.html">\n'
	);
	await docs('docs', dest);
};

task['build:windows'] = async () => {
	const dest = 'build/windows';
	await remove(dest);
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
	b.projector.iconFile = 'res/app-icon-windows.ico';
	b.projector.patchWindowTitle = appName;
	b.projector.removeCodeSignature = true;
	await bundle(b, 'flash-player-32.0.0.465-windows-sa-debug');
	await docs('docs', dest);
};

task['build:mac'] = async () => {
	// Release projectors on Mac have slow performance when resized larger.
	// Debug projectors do not have this performance issue.
	const dest = 'build/mac';
	await remove(dest);
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
	b.projector.iconFile = 'res/app-icon-mac.icns';
	b.projector.patchWindowTitle = appName;
	b.projector.removeInfoPlistStrings = true;
	b.projector.removeCodeSignature = true;
	await bundle(b, 'flash-player-32.0.0.465-mac-sa-debug-zip');
	await docs('docs', dest);
};

task['build:linux-i386'] = async () => {
	const dest = 'build/linux-i386';
	await remove(dest);
	const b = new BundleLinux32(`${dest}/${appFile}`);
	b.projector.patchProjectorPath = true;
	b.projector.patchWindowTitle = appName;
	await bundle(b, 'flash-player-11.2.202.644-linux-i386-sa-debug', true);
	await docs('docs', dest);
};

task['build:linux-x86_64'] = async () => {
	const dest = 'build/linux-x86_64';
	await remove(dest);
	const b = new BundleLinux64(`${dest}/${appFile}`);
	b.projector.patchProjectorPath = true;
	b.projector.patchProjectorOffset = true;
	b.projector.patchWindowTitle = appName;
	await bundle(b, 'flash-player-32.0.0.465-linux-x86_64-sa-debug', true);
	await docs('docs', dest);
};

task['dist:browser:zip'] = async () => {
	await makeZip(`dist/${distName}-Browser.zip`, 'build/browser');
};

task['dist:browser:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Browser.tgz`, 'build/browser');
};

task['dist:windows:zip'] = async () => {
	await makeZip(`dist/${distName}-Windows.zip`, 'build/windows');
};

task['dist:windows:exe'] = async () => {
	const outDir = 'dist';
	const outFile = `${distName}-Windows`;
	await remove(`${outDir}/${outFile}.exe`);
	await makeExe('innosetup.iss', {
		VarId: appDomain,
		VarName: appName,
		VarNameFile: appFile,
		VarVersion: version,
		VarPublisher: author,
		VarCopyright: copyright,
		VarLicense: 'LICENSE.txt',
		VarIcon: 'res/inno-icon.ico',
		VarWizardImageHeader: 'res/inno-header/*.bmp',
		VarWizardImageSidebar: 'res/inno-sidebar/*.bmp',
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
};

task['dist:mac:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Mac.tgz`, 'build/mac');
};

task['dist:mac:dmg'] = async () => {
	await makeDmg(`dist/${distName}-Mac.dmg`, {
		format: 'UDBZ',
		title: appDmgTitle,
		'icon-size': 128,
		icon: 'res/dmg-icon.icns',
		background: 'res/dmg-background/dmg-background.png',
		window: {
			size: {
				width: 640,
				height: 512
			}
		},
		contents: [
			{
				x: 160,
				y: 108,
				type: 'file',
				path: `build/mac/${appFile}.app`
			},
			{
				x: 480,
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
};

task['dist:linux-i386:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Linux-i386.tgz`, 'build/linux-i386');
};

task['dist:linux-x86_64:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Linux-x86_64.tgz`, 'build/linux-x86_64');
};

await task[process.argv[2]]();
