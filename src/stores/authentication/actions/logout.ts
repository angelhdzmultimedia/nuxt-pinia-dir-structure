import { isAuthenticated, user } from '../state';

export async function logout() {
  isAuthenticated.value = false;
  user.value = undefined;
}
