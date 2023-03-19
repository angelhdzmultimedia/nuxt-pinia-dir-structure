<script setup lang="ts">
const auth = useAuthenticationStore()
</script>

<template>
  <NuxtLayout name="main">
    <main>
      <span>Index Page</span>
      Is Authenticated: {{ auth.isAuthenticated }}
    </main>
  </NuxtLayout>
</template>
