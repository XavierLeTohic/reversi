/* eslint-disable global-require */
import path from 'path';
import fs from 'fs';

export default {
  mode: 'spa',
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../cert.pem')),
    },
  },
  head: {
    titleTemplate: 'Play now | ReversiMoji',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Play now to a new modern Reversi game !' },
      { hid: 'apple-mobile-web-app-capable', name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'apple-mobile-web-app-status-bar-style', name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      { rel: 'preload', as: 'image', href: './textures/noise.png' },
    ],
    script: [
      { src: 'https://connect.facebook.net/en_US/fbinstant.6.2.js' },
    ],
  },
  css: [
    '~/assets/main.styl',
  ],
  modules: [
    ['@nuxtjs/pwa', {
      workbox: {
        publicPath: './_nuxt/',
      },
      manifest: {
        publicPath: './_nuxt/',
      },
    }],
  ],
  plugins: [
    { src: '~/plugins/facebook', ssr: false },
  ],
  router: {
    mode: 'hash',
  },
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
  },
  manifest: {
    name: 'ReversiMoji',
    short_name: 'ReversiMoji',
    description: 'Reversi game modernized',
    lang: 'en',
    display: 'standalone',
  },
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-preset-env': {},
        cssnano: { preset: 'default' }, // disabled in dev mode
        autoprefixer: {},
      },
      order: 'cssnanoLast',
    },
    extend(config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      if (!isDev) {
        // eslint-disable-next-line no-param-reassign
        config.output.publicPath = './_nuxt/';
      }

      return config;
    },
  },
};
