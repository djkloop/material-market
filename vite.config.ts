import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import windiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
import { generateModifyVars } from './build/genVars';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    Components({
      resolvers: [
        ArcoResolver()
      ]
    }),
    windiCSS()
  ],
})
