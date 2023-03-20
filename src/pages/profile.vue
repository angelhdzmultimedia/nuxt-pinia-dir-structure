<script setup lang="ts">
const auth = useAuthenticationStore();
</script>

<template>
  <NuxtLayout name="main">
    <main class="column q-pt-md items-center">
      <span class="text-h6">{{ auth.user?.name }}'s Profile</span>
    </main>
  </NuxtLayout>
</template>
