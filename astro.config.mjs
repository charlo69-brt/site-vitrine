// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Site statique + routes API à la demande (fonctions serverless Vercel)
// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
