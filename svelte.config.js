import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      server: {
        hmr: {
          clientport:process.env.HMR_HOST ? 5173 : 3000,
          host: process.env.HMR_HOST ? process.env.HMR_HOST.substring("https://".length) : process.env.'localhost',
        },
      },
    },
  },
};

export default config;
