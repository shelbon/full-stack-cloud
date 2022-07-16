import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
        hmr: {
          port: process.env.HMR_HOST ? 5173 : 3000,
          host: process.env.HMR_HOST
            ? process.env.HMR_HOST.substring('https://'.length)
            : 'localhost',
        },
      },
};

export default config;
