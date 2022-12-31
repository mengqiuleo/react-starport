/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 16:18:38
 * @LastEditTime: 2023-01-01 02:57:07
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({ // 使用Unocss
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        ['flex', { display: "flex" }],
        ['green', { color: "green" }],
        ['font28', { 'font-size': '40px' }],
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
      ],
      // 组合样式 自定义
      shortcuts: {
        fuck: ['green', 'font28']
      }
    })
  ]
})
