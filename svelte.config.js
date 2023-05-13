import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: true
		}),
		appDir: 'internal',
		paths: {
			base: process.env.USE_BASE_PATH ? '/journal' : ''
		},
		csp: {
			mode: 'hash',
			directives: {
				'default-src': [
					'self',
					'https://api.dropboxapi.com',
					'https://content.dropboxapi.com',
					'https://www.googleapis.com',
					'https://*.openstreetmap.org'
				].concat(isProduction ? [] : ['ws://*:*']),
				'img-src': ['self', 'data:', 'https://*.openstreetmap.org'],
				'font-src': ['self', 'blob:', 'data:'],
				'style-src': ['self', 'unsafe-inline']
			}
		}
	}
};

export default config;
