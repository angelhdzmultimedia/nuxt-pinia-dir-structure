export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  modules: ['@pinia/nuxt', ['nuxt-quasar-ui', { autoImports: true }]],
  imports: {
    dirs: ['stores/*/index.ts'],
    imports: [
      { from: 'pinia', name: 'defineStore' },
      { from: 'pinia', name: 'storeToRefs' },
    ],
  },
  quasar: {
    extras: {
      font: 'roboto-font',
      fontIcons: ['fontawesome-v6', 'ionicons-v4', 'material-icons', 'mdi-v7'],
    },

    plugins: ['Dark', 'Dialog', 'Notify'],
  },
});
