<script setup lang="ts">
defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const email = ref<string>()
const password = ref<string>()
const isPasswordHidden = ref<boolean>(true)
const step = ref(1)
const { notifyError } = useNotificationStore()
const route = useRoute()
const stepperRef = ref<QStepper | undefined>
const passwordInputRef = ref<QInput | undefined>()
const emailInputRef = ref<QInput | undefined>()


// Computed

const isPersistent = computed(() => route.path === '/login')
const isDone = computed(() => step.value === 3)
const isValidated = computed(() => {
  return !emailInputRef.value?.hasError && !passwordInputRef.value?.hasError
})

// Validations

const isEmail = (value) => {
const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(value) || 'Email not valid!';
}

const isRequired = (value) => !!value || 'Field required!'

// Stores

const auth = useAuthenticationStore()

function handleCloseButtonClick() {
  onDialogCancel()
  if (route.path === '/login') {
    return navigateTo('/')
  }
}

async function handleLoginButtonClick() {
try {
    await auth.login(email.value, password.value)
    onDialogOK()
    return navigateTo('/')
  } catch (error: unknown) {
    notifyError(error.message)
  }
}

function handlePasswordVisibilityIconClick() {
  isPasswordHidden.value = !isPasswordHidden.value
}

function handleStepperPreviousButtonClick() {
  if (step.value < 1) {
    return
  }
  step.value--
   nextTick(() => {
    emailInputRef.value?.focus()
  passwordInputRef.value?.focus()
  })
}

function handleStepperNextButtonClick() {
  if (step.value > 2) {
    return
  }
  step.value++
  nextTick(() => {
    emailInputRef.value?.focus()
  passwordInputRef.value?.focus()
  })
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
        <span class="text-h6">Login Form</span>
        <q-stepper ref="stepperRef" v-model="step" color="primary" animated>
          <q-step
            :name="1"
            title="Email"
            active-icon="mail"
            icon="mail"
            :done="step > 1"
            :error="emailInputRef?.hasError"
          >
            <q-input
              ref="emailInputRef"
              lazy-rules
              :rules="[isEmail, isRequired]"
              v-model="email"
              filled
              dense
              label="Email"
            />
          </q-step>
          <q-step
            :name="2"
            title="Password"
            active-icon="lock"
            icon="lock"
            :done="step > 2"
            :error="passwordInputRef?.hasError"
          >
            <q-input
              ref="passwordInputRef"
              lazy-rules
              :rules="[isRequired]"
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
            <q-stepper-navigation>
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="handleStepperPreviousButtonClick"
                label="Back"
                class="q-ml-sm"
              />
              <q-btn
                :disabled="!isValidated"
                v-if="!isDone"
                @click="handleStepperNextButtonClick"
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
