<script setup lang="ts">
const auth = useAuthenticationStore();
const { show: showLogin } = useLogin();

function handleLoginButtonClick() {
  showLogin();
}
</script>

<template>
  <NuxtLayout name="main">
    <main class="column items-center q-pt-md">
      <span class="text-h6 text-primary"
        >Welcome, {{ auth.user?.name ?? 'Guest' }}!</span
      >
      <q-btn
        v-if="!auth.isAuthenticated"
        @click="handleLoginButtonClick"
        color="primary"
        label="Login"
      />
    </main>
  </NuxtLayout>
</template>
