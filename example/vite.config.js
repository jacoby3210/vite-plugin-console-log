import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteConsoleLine} from '../src/index' 

// https://vitejs.dev/config/
const port = 9528
const viteConfig = defineConfig({
  server: {
    port: port,
    open: true,
  },
  plugins: [viteConsoleLine({ exclude: ['node_modules'] }), vue(),],
})
export default viteConfig
