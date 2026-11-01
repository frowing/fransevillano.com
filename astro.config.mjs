import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fransevillano.com',
  // WordPress URLs end in a slash (/2018/02/04/post-name/), so keep them identical
  trailingSlash: 'always',
  integrations: [sitemap()],
});
