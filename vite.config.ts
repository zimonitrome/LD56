import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import textImportPlugin from './vite-markdown-import-plugin'; // Adjust the path as needed
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    textImportPlugin()
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
