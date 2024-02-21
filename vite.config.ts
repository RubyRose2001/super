import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import path from 'path'
// 按需导入 start
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 按需导入 end
// 模块联邦
import federation from "@originjs/vite-plugin-federation";

// 打包大小分析 start
import { visualizer } from 'rollup-plugin-visualizer';
// 打包大小分析 end

import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, 'typings')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target:'es2022',
    rollupOptions: {
      plugins: [visualizer({ open: true, filename: 'bundle-report.html' })]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'meikuang_sub': path.resolve(__dirname, '/Users/mac/Library/pnpm/global/5/node_modules/meikuang_sub/src/views/sub/export')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
    federation({
      name: "meikuang",
      filename: "remoteEntry.js",
      remotes: {
        'auth_settings': 'http://localhost:5173/dist/assets/remoteEntry.js',
      },
      shared: ["vue", "vue-router", "element-plus", "@element-plus/icons-vue", "pinia"],
    }),
  ],
  // 代理  'http://192.168.0.15:9090/’
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.15:9090',
        changeOrigin: true, // 需要虚拟主机站点
      }
    }
  }
})
