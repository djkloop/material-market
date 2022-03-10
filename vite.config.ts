import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
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

const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
const prodEnabled: boolean = (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;

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
    windiCSS(),
    viteMockServe({
      // ↓解析根目录下的mock文件夹
      mockPath: "mock",
      localEnabled: localEnabled,  // 开发打包开关
      prodEnabled: prodEnabled, // 生产打包开关
      supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
      watchFiles: true, // 监视文件更改
    })
  ],

})
