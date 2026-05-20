import { defineConfig } from 'astro/config';
import { publishedDate } from './src/utils/content-frontmatter';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://mehrlicht.photos/',
    cacheDir: '.astro',
    markdown: {
        remarkPlugins: [publishedDate],
    },
    build: {
        inlineStylesheets: 'never',
    },
    integrations: [sitemap()],
});
