import { Notify } from 'quasar'

export function notifySuccess(message: string) {
  return Notify.create({ message, type: 'positive' })
}
