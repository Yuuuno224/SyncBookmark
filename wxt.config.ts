import { defineConfig } from 'wxt';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  vite: () => ({
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: true,
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // 可选：自动生成类型声明文件
        dts: true,
      }),
    ],
  }),
});
