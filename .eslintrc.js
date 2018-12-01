module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "airbnb-base",
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "object-curly-newline": "off",
    "import/no-unresolved": [
      "error",
      {
        "ignore": [ '~/' ]
      }
    ],
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        'max-len': 'off'
      }
    }
  ],
}