/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 16:18:38
 * @LastEditTime: 2023-01-02 01:59:37
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import Unocss from 'unocss/vite'
import pkg from './package.json'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    WindiCSS(),
    react(),
    Unocss({
      shortcuts: [
        [
          'icon-btn',
          'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
        ],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
        presetWebFonts({
          fonts: {
            serif: 'DM Serif Display',
            mono: 'DM Mono',
          },
        }),
      ],
      rules: [
        ['font28', { 'font-size': '25px' }],
        ['mar-t', {'margin-top': '20px'}]
      ]
    }),
  ],
  // build: {
  //   cssCodeSplit: true,
  //   lib: {
  //     entry: './src/main.tsx',
  //     formats: ['es', 'umd'],
  //     name: pkg.name,
  //     fileName: format => `index.${format}.js`,
  //   },
  //   rollupOptions: {
  //     external: ['react', 'react-dom', 'react-router-dom'],
  //   },
  // },
})
