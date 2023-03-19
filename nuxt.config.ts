export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  modules: ['@pinia/nuxt', ['nuxt-quasar-ui', { autoImports: true }]],
  imports: {
    dirs: ['.src/stores/*/index.{ts}]', './src/stores', './src/stores/**'],
    imports: [{ from: 'pinia', name: 'defineStore' }],
  },
  quasar: {
    extras: {
      font: 'roboto-font',
      fontIcons: ['fontawesome-v6', 'ionicons-v4', 'material-icons', 'mdi-v7'],
    },

    plugins: ['Dark', 'Dialog', 'Notify'],
  },
})
