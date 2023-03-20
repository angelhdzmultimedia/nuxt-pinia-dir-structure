<script setup lang="ts">
import LoginPage from '~/pages/login.vue'
const auth = useAuthenticationStore()
const $q = useQuasar()

function handleLoginButtonClick() {
  $q.dialog({
    component: LoginPage,
  })
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
