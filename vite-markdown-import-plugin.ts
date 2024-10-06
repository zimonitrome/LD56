import { Plugin } from 'vite';
import fs from 'fs/promises';

export default function markdownImportPlugin(): Plugin {
  return {
    name: 'vite-plugin-markdown-import',
    async load(id) {
      if (id.endsWith('.md')) {
        try {
          const content = await fs.readFile(id, 'utf-8');
          return `export default ${JSON.stringify(content)};`;
        } catch (error) {
          console.error(`Error reading Markdown file ${id}:`, error);
          return null;
        }
      }
    }
  };
}