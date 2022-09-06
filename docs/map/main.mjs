#!/usr/bin/env node

import fse from 'fs-extra';

import {generate} from './generator.mjs';

async function main() {
	const args = process.argv.slice(2);
	if (!args.length) {
		throw new Error('Arguments: svg');
	}
	const [svg] = args;
	await fse.outputFile(svg, await generate());
}
main().catch(err => {
	process.exitCode = 1;
	console.error(err);
});
