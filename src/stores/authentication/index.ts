import * as state from './state'
import * as actions from './actions'

export const useAuthenticationStore = defineStore('authentication', () => {
  return {
    ...state,
    ...actions,
  }
})
