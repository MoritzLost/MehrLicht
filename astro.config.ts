import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://mehrlicht.photos/',
    cacheDir: '.astro',
    build: {
        inlineStylesheets: 'never',
    },
    integrations: [sitemap()],
});
