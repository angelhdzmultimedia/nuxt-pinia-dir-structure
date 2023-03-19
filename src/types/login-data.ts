import { User } from './user'

export type LoginData = Pick<User, 'email' | 'password'>
