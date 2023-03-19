export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui'],
  imports: {
    dirs: ['stores/**'],
  },
  quasar: {
    extras: {
      
    }
  }
})
