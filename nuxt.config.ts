export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  modules: ['@pinia/nuxt', ['nuxt-quasar-ui', { autoImports: true }]],
  imports: {
    dirs: ['stores/**', 'stores/*/index.ts', 'stores'],
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
