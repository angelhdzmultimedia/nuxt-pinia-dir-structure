<script setup lang="ts">
const auth = useAuthenticationStore();

async function handleLogoutButtonClick() {
  await auth.logout();
  navigateTo('/');
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn icon="home" to="/" />
        <q-toolbar-title>App</q-toolbar-title>
        <q-avatar color="white" class="cursor-pointer">
          <q-menu auto-close>
            <q-list>
              <q-item>
                <q-item-section>
                  <span v-if="!auth.isAuthenticated">Guest</span>
                  <q-btn
                    to="/profile"
                    v-if="auth.isAuthenticated"
                    :label="auth?.user.name"
                  />
                </q-item-section>
              </q-item>
              <q-item v-if="!auth.isAuthenticated">
                <q-btn to="/login" color="primary" label="Login" />
              </q-item>
              <q-item v-if="auth.isAuthenticated">
                <q-btn
                  @click="handleLogoutButtonClick"
                  color="primary"
                  label="Logout"
                />
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
