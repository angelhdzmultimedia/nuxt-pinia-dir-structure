import LoginPage from './login.vue';

export const useLogin = () => {
  const $q = useQuasar();

  return {
    LoginPage,
    show() {
      $q.dialog({
        component: LoginPage,
      });
    },
  };
};
