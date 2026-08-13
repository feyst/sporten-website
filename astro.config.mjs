// @ts-check
import { defineConfig } from 'astro/config';

// Statische site voor sporten.app; de output (dist/) gaat via FTPS naar productie.
// PR-previews bouwen met PREVIEW_BASE (subpad op GitHub Pages); productie draait op /.
export default defineConfig({
  site: 'https://sporten.app',
  base: process.env.PREVIEW_BASE ?? '/',
  build: {
    // De volledige CSS is ~10 KB: inline scheelt een render-blokkerende request
    // en de site heeft geen tweede pagina-bezoek dat van caching zou profiteren.
    inlineStylesheets: 'always',
  },
});
