import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
console.log(process.env.NODE_ENV)
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/house_inspection' : '',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
})
