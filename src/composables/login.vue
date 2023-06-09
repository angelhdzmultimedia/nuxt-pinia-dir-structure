<script setup lang="ts">
const props = defineProps({isPopup: true})
defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const email = ref<string>('angelhdz@gmail.com')
const password = ref<string>('123456')
const isPasswordHidden = ref<boolean>(true)
const step = ref(1)
const { notifyError } = useNotificationStore()
const route = useRoute()
const stepperRef = ref<QStepper | undefined>
const passwordInputRef = ref<QInput | undefined>()
const emailInputRef = ref<QInput | undefined>()


// Computed

const isPersistent = computed(() => !props.isPopup)
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
  if (!props.isPopup) {
    navigateTo('/')
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

function handlePreviousButtonClick() {
  if (step.value < 1) {
    return
  }
  step.value--
  nextTick(focusInputs)
}

function handleNextButtonClick() {
  if (step.value > 2) {
    return
  }
  step.value++
}


onMounted(() => {
  if (!props.isPopup) {
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
              autofocus
              lazy-rules="ondemand"
              @change="emailInputRef?.validate"
              ref="emailInputRef"
              :rules="[isRequired, isEmail]"
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
              autofocus
              ref="passwordInputRef"
              @change="emailInputRef?.validate"
              lazy-rules="ondemand"
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
                @click="handlePreviousButtonClick"
                label="Back"
                class="q-ml-sm"
              />
              <q-btn
                :disabled="!isValidated"
                v-if="!isDone"
                @click="handleNextButtonClick"
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
