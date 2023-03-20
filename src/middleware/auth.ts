export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthenticationStore();

  await auth.findUser();

  if (!auth.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  }
});
