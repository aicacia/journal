import { defineConfig } from 'vite';
import { internalIpV4 } from 'internal-ip';
import { sveltekit } from '@sveltejs/kit/vite';

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const host = await internalIpV4();

	/** @type {import('vite').UserConfig} */
	const config = {
		server: {
			host: '0.0.0.0', // listen on all addresses
			port: 3000,
			strictPort: true,
			hmr: {
				protocol: 'ws',
				host
			}
		},
		optimizeDeps: {
			exclude: ['svelte-slate']
		},
		plugins: [sveltekit()]
	};

	return config;
});
