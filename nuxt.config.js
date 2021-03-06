/* eslint-disable global-require */
export default {
  ssr: false,
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
  },
  css: [
    '~/assets/main.styl',
  ],
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
  },
  static: {
    prefix: false,
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

      return config;
    },
  },
};
