<script setup lang="ts">
defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const email = ref<string>()
const password = ref<string>()
const isPasswordHidden = ref<boolean>(true)
const formRef = ref<QForm | undefined>()
const step = ref(1)
const { notifyError } = useNotificationStore()
const route = useRoute()
const stepperRef = ref<QStepperNavigation | undefined>

// Computed
const isPersistent = computed(() => route.path === '/login')
const isDone = computed(() => step.value === 3)

// Stores
const auth = useAuthenticationStore()

function handleCloseButtonClick() {
  onDialogCancel()
  if (route.path === '/login') {
    return navigateTo('/')
  }
}

function handleLoginButtonClick() {
 // loginForm.value?.submit()
}

function handlePasswordVisibilityIconClick() {
  isPasswordHidden.value = !isPasswordHidden.value
}

async function handleLoginFormSubmit() {
  try {
    await auth.login(email.value, password.value)
  } catch (error: unknown) {
    notifyError(error.message)
  }
}

function handleStepPreviousButtonClick() {
  stepperRef.value
}

function handleStepNextButtonClick() {
  
}

onMounted(() => {
  if (route.path === '/login') {
    dialogRef.value?.show()
  }
})


</script>

<template>
  <q-dialog :persistent="isPersistent" ref="dialogRef" @hide="onDialogHide">
    <q-card class="column items-center q-pa-sm">
      <q-card-section class="column items-center q-gutter-y-sm">
        <span class="text-h6">Login</span>
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            title="Email"
            active-icon="mail"
            icon="mail"
            :done="step > 1"
          >
            <q-input v-model="email" filled dense label="Email" />
          </q-step>
          <q-step
            :name="2"
            title="Password"
            active-icon="lock"
            icon="lock"
            :done="step > 2"
          >
            <q-input
              v-model="password"
              filled
              dense
              label="Password"
              :type="isPasswordHidden ? 'password' : 'text'"
            >
              <template #append>
                <q-icon
                  class="cursor-pointer"
                  @click="handlePasswordVisibilityIconClick"
                  :name="!isPasswordHidden ? 'visibility_off' : 'visibility'"
                />
              </template>
            </q-input>
          </q-step>

          <q-step
            :name="3"
            title="Ready"
            active-icon="check"
            icon="check"
            :done="step > 3"
          >
            <span v-if="isDone" class="text-green-14">You can login now!</span>
          </q-step>

          <template #navigation>
            <q-stepper-navigation ref="stepperRef">
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="handleStepPreviousButtonClick"
                label="Back"
                class="q-ml-sm"
              />
              <q-btn
                v-if="!isDone"
                @click="handleStepNextButtonClick"
                color="primary"
                label="Next"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
      <q-card-actions>
        <q-btn
          @click="handleCloseButtonClick"
          color="grey-4"
          text-color="primary"
          flat
          label="Cancel"
        />
        <q-btn
          :disabled="!isDone"
          @click="handleLoginButtonClick"
          color="primary"
          label="Login"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
