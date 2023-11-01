<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title">Sign In</h3>
    </div>

    <div class="app-auth__content">
      <form class="auth-form" @submit.prevent="handleSignIn">
        <div class="auth-form__fieldset">
          <n-input size="large" v-model="email" placeholder="E-mail">
            <template #prefix>
              <!-- <n-icon :component="baselineEmail" /> -->
              <baselineEmail />
            </template>
          </n-input>
        </div>

        <div class="auth-form__fieldset">
          <n-input
            type="password"
            show-password-on="mousedown"
            placeholder="Password"
            size="large"
            v-model="password"
          >
            <template #prefix>
              <lockIcon />
            </template>
          </n-input>
        </div>

        <n-button type="primary" size="large" class="auth-form__btn">Sign In</n-button>
      </form>
    </div>

    <div class="app-auth__footer">
      <n-divider>OR</n-divider>

      <div class="app-auth__signup" @click="this.$emit('auth-type', '__SIGNUP__')">
        <n-button size="large">Sign Up</n-button>
      </div>
    </div>
  </div>
</template>

<script>
import lockIcon from '~icons/mdi/lock'
import eyeIcon from '~icons/mdi/eye'
import eyeOff from '~icons/mdi/eye-off'
import baselineEmail from '~icons/ic/baseline-email'

// import { EmailFilled } from '~vicons/ionicons5'

import * as Api from '@/api'
import { setCookie } from 'nookies'

export default {
  name: 'login-form',
  components: {
    lockIcon,
    eyeIcon,
    eyeOff,
    baselineEmail,
    // EmailFilled
  },
  data() {
    return {
      passwordVisiblity: false,
      password: null,
      email: null
    }
  },
  methods: {
    async handleSignIn() {
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        const { token } = await Api.auth.login(data)

        setCookie(null, '_token', token, { path: '/' })

        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    check() {}
  }
}
</script>

<style>
</style>