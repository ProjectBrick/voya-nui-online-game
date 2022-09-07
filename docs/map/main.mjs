#!/usr/bin/env node

import {map} from './map.mjs';

async function main() {
	console.log(await map());
}
main().catch(err => {
	console.error(err);
	process.exitCode = 1;
});
