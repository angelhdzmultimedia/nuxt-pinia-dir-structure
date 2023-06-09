import LoginPage from './login.vue';

type LoginOptions = {
  isPopup: boolean;
};
export const useLogin = (options: LoginOptions = { isPopup: true }) => {
  const $q = useQuasar();
  const isPopup = ref(false);

  return {
    LoginPage,
    isPopup,
    show() {
      return $q.dialog({
        component: LoginPage,
        componentProps: {
          isPopup: options.isPopup,
        },
      });
    },
  };
};
