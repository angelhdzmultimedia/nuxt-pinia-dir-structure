import { User } from './user'

export type AuthenticatedUser = Omit<User, 'password'>
