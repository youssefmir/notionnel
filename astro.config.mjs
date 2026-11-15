import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import { learningMarkdown } from './src/lib/learning-markdown.js';

const base = process.env.BASE_PATH || '/';
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || undefined,
  base,
  trailingSlash: 'always',
  markdown: { processor: unified({ remarkPlugins: [[learningMarkdown, { base }]] }) },
  vite: {
    plugins: [tailwindcss()],
    build: {
      license: { fileName: 'licences-javascript.md' },
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [{ name: 'react-dom', test: /node_modules\/(?:react|react-dom|scheduler)\// }],
          },
        },
      },
    },
  },
  devToolbar: { enabled: false },
});
