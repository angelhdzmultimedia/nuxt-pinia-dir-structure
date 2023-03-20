import { Notify } from 'quasar'

export function notifyError(message: string) {
  return Notify.create({ message, type: 'negative' })
}
