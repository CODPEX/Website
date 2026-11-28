import { defineConfig } from 'fumadocs-mdx/config';
import { rehypeCode } from 'fumadocs-core/mdx-plugins';

export default defineConfig({
  mdxOptions: {
    // Monaco / VS Code 风格双主题；addLanguageClass 保留 language-xxx 供标签显示
    rehypePlugins: [
      [
        rehypeCode,
        {
          addLanguageClass: true,
          themes: { light: 'light-plus', dark: 'dark-plus' },
        },
      ],
    ],
  },
});
