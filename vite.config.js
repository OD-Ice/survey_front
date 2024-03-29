import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


export default ({mode}) => {
    const env = loadEnv(mode, process.cwd())
    const baseUrl = env.VITE_API
    return defineConfig({
        envPrefix: ["VITE_"],
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            }
        },
        server: {
            proxy: {
                "/api" : {
                    target: baseUrl
                }
            }
        }
    })
}
