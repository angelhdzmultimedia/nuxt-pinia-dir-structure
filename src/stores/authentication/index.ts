export const useAuthenticationStore = defineStore('authentication', () => {
  const actions = import.meta.glob('./actions/*.action')
  const state = import.meta.glob('./state/*.state')

  return {}
})
