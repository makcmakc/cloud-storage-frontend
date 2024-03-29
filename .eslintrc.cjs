/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  rules: {
    'vue/no-v-model-argument': 'off',
    'vue/no-multiple-template-root': 'off',
    '[vue/no-multiple-template-root]': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // workingDirectories: [
  //   {
  //     'mode': 'auto'
  //   }
  // ]
}
