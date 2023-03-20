<script setup lang="ts">
const { show: showLogin } = useLogin({ isPopup: false });

onMounted(showLogin);
</script>

<template></template>
