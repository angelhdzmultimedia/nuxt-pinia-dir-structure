import * as state from './state'
import * as actions from './actions'

export const useNotificationStore = defineStore('notification', () => {
  return {
    ...state,
    ...actions,
  }
})
