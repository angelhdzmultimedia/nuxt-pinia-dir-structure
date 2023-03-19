import type { AuthenticatedUser } from '~~/src/types/authenticated-user'

export const authenticatedUser = ref<AuthenticatedUser | undefined>()
export const isAuthenticated = ref<boolean>(false)
export const isAuthenticating = ref<boolean>(false)
