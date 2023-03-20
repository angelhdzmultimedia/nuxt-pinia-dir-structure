import { LoginData } from '~/types/login-data'
import { isAuthenticated, user } from '../state'

type LoginDataArgs = [LoginData] | [string, string]

export async function login(email: string, password: string): Promise<void>
export async function login(loginData: LoginData): Promise<void>
export async function login(...args: LoginDataArgs): Promise<void> {
  let loginData: LoginData = { email: '', password: '' }
  const email = args[0] as string
  const password = args[1] as string

  const loginDataAlike = args[0] as LoginData

  if (loginDataAlike && loginDataAlike.email && loginDataAlike.password) {
    loginData = {
      ...loginDataAlike,
    }
  } else if (email || password) {
    loginData = {
      email,
      password,
    }
  }

  isAuthenticated.value = true
  user.value = {
    ...loginData,
    id: Date.now().toString(),
    name: 'Angel',
    username: 'angelhdz',
  }
}
