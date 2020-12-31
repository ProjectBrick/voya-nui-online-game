'use strict';

const util = require('util');

const fse = require('fs-extra');
const imageSize = require('image-size');

const imageSizeP = util.promisify(imageSize);

function toRanges(numbers) {
	const numbersSorted = numbers.slice().sort((a, b) => a - b);
	let prev = null;
	let run = null;
	const runs = [];
	for (const n of numbersSorted) {
		if (prev !== null && prev + 1 === n) {
			run.push(n);
		}
		else {
			run = [n]
			runs.push(run);
		}
		prev = n;
	}
	return runs.map(
		a => a.length > 2 ? `${a[0]}-${a[a.length - 1]}` : a.join(' ')
	);
}

function escapeXml(s) {
	return `${s}`.replace(/[&'"<>]/g, function(c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
}

function style(props) {
	return Object.entries(props).map(([p, v]) => `${p}: ${v};`).join(' ');
}

function styles(selector, props) {
	return `${selector} { ${style(props)} }`;
}

function xml(tag, attrs = {}, content = null) {
	const a = Object.entries(attrs)
		.map(([a, v]) => `${a}="${escapeXml(v)}"`)
		.join(' ');
	return [
		`<${tag}`, ...(a ? [' ', a] : []),
		...(content === null ?
			['/>'] :
			[
				'>',
				...Array.isArray(content) ?
					['\n', ...content.map(s => `${s}\n`)]
					: content,
				`</${tag}>`
			]
		)
	].join('');
}

async function readMaps() {
	const code = await fse.readFile(`${__dirname}/maps.as`, 'utf8');
	return Function(`'use strict';var M;${code};return M;`)();
}

async function generate(attrs = {}) {
	const mapJpg = `${__dirname}/map.jpg`;
	const mapJpgB64 = await fse.readFile(mapJpg, 'base64');
	const {width, height} = await imageSizeP(mapJpg);
	const markerW = 20.2;
	const markerH = 14.4;
	const gridX = 86;
	const gridY = 44;
	const fontSize = 12;

	const positions = new Map();
	const maps = await readMaps();
	const ids = Object.keys(maps).map(Number).sort((a, b) => a - b);
	for (const id of ids) {
		const map = maps[id];
		const x = Math.max(map.x, -1);
		const y = Math.max(map.y, -1);
		const key = [x, y].join(',');
		const position = positions.get(key) || {x, y, ids: []};
		position.ids.push(id);
		positions.set(key, position);
	}

	const markers = [...positions.values()]
		.sort((a, b) => a.x - b.x)
		.sort((a, b) => a.y - b.y)
		.map(({x, y, ids}) => {
			const pX = (x * markerW) + gridX;
			const pY = (y * markerH) + gridY;
			const pXX = pX + markerW;
			const pYY = pY + markerH;
			let textAnchor = '';
			let textX = 0;
			if (ids.length > 1) {
				if (pX > (width / 2)) {
					textAnchor = 'end';
					textX = pX + markerW;
				}
				else {
					textAnchor = 'start';
					textX = pX;
				}
			}
			else {
				textAnchor = 'middle';
				textX = pX + (markerW / 2);
			}
			return [
				xml('rect', {
					class: 'map-marker-shape',
					x: Math.round(pX),
					y: Math.round(pY),
					width: Math.round(Math.round(pXX) - pX),
					height: Math.round(Math.round(pYY) - pY)
				}),
				xml('text', {
					class: 'map-marker-label',
					x: Math.round(textX),
					y: Math.round(pY - (fontSize / 4)),
					'text-anchor': textAnchor
				}, escapeXml(toRanges(ids).join(' ')))
			];
		});

	return xml('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		width,
		height,
		viewBox: `0 0 ${width} ${height}`,
		...attrs
	}, [
		xml('style', {}, [
			styles('.map-marker-shape', {
				fill: '#FFFFFF',
				'fill-opacity': 0.1,
				cursor: 'pointer'
			}),
			styles('.map-marker-shape:hover', {
				'fill-opacity': 0.5,
			}),
			styles('.map-marker-label', {
				visibility: 'hidden',
				fill: '#FFFFFF',
				'font-family': 'monospace, monospace',
				'font-size': `${fontSize}px`,
				'line-height': 1,
				'pointer-events': 'none'
			}),
			styles('.map-marker-shape:hover + .map-marker-label', {
				visibility: 'visible'
			})
		]),
		xml('image', {
			href: `data:image/jpeg;base64,${mapJpgB64}`
		}),
		...markers.flat()
	]);
};
exports.generate = generate;

async function main() {
	const args = process.argv.slice(2);
	if (!args.length) {
		throw new Error('Arguments: svg');
	}
	const [svg] = args;
	await fse.outputFile(svg, await generate());
}
if (!module.parent) {
	main().catch(err => {
		process.exitCode = 1;
		console.error(err);
	});
}
