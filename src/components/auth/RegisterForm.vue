<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title">Sign Up</h3>
    </div>

    <div class="app-auth__content">
      <form class="auth-form" @submit.prevent="handleSignUp">
        <fieldset class="auth-form__fieldset">
          <n-input
            size="large"
            placeholder="E-mail"
            v-model:value="email"
          >
            <template #prefix>
              <baselineEmail />
            </template>
          </n-input>
        </fieldset>

        <fieldset class="auth-form__fieldset">

          <n-input
            size="large"
            placeholder="Full name"
            v-model:value="fullName"
          >
            <template #prefix>
              <baselinePerson />
            </template>
          </n-input>
        </fieldset>

        <fieldset class="auth-form__fieldset">
          <n-input
            type="password"
            show-password-on="mousedown"
            placeholder="Password"
            size="large"
            v-model:value="password"
          >
            <template #prefix>
              <lockIcon />
            </template>
          </n-input>
        </fieldset>

        <n-button type="primary" attr-type="submit" size="large" class="auth-form__btn">Sign Up</n-button>
      </form>
    </div>

    <div class="app-auth__footer">
      <n-divider>OR</n-divider>

      <div class="app-auth__signup" @click="this.$emit('auth-type', '__SIGNIN__')">
        <n-button size="large">Sign In</n-button>
      </div>
    </div>
  </div>
</template>

<script>
import accountIcon from '~icons/mdi/account';
import lockIcon from '~icons/mdi/lock';
import eyeIcon from '~icons/mdi/eye';
import eyeOff from '~icons/mdi/eye-off';
import baselinePerson from '~icons/ic/baseline-person';
import baselineEmail from '~icons/ic/baseline-email';

// import * as Api from '@/api'
// import { setCookie } from 'nookies'
import { supabase } from '@/core/supabaseClient'
// import { useMessage } from 'naive-ui'


export default {
  name: 'register',
  components: {
    accountIcon,
    lockIcon,
    eyeIcon,
    eyeOff,
    baselineEmail,
    baselinePerson
  },
  data() {
    return {
      password: null,
      email: null,
      fullName: null
    }
  },
  methods: {
    // async signUpNewUser() {
    //   const data = {
    //     email: this.email,
    //     password: this.password,
    //     fullName: this.fullName
    //   }
    //   try {
    //     const { error } = await supabase.auth.signUp(data)
    //     if (error) message.warning(error)
    //     this.$router.push('/')
    //   } catch(err) {
    //     console.log(err)
    //   }
    // },
  },
}
</script>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/core/supabaseClient'
// import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const loading = ref(false)
const email = ref('')
const password = ref('')

// const message = useMessage()
const router = useRouter()

const handleSignUp = async () => {
  try {
    // loading.value = true
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) message.warning(error)
    router.push('/')
  } catch (error) {
    if (error instanceof Error) message.error(error.message)
    message.error(error.message)
  } finally {
    // loading.value = false
  }
}
</script>

<style>
</style>