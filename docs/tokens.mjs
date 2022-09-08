import {map} from './map/map.mjs';

export default [
	['<!--{MAP}-->', await map({
		style: 'display: block; max-width: 100%; height: auto; margin: 0 auto;'
	})]
];
