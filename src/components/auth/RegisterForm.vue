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
          >
            <template #prefix>
              <!-- <n-icon :component="baselineEmail" /> -->
              <baselineEmail />
            </template>
          </n-input>
        </fieldset>

        <fieldset class="auth-form__fieldset">
          <n-input
            size="large"
            placeholder="Full name"
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
            :maxlength="8"
            size="large"
          >
            <template #prefix>
              <lockIcon />
            </template>
          </n-input>
        </fieldset>

        <n-button type="primary" size="large" class="auth-form__btn">Sign Up</n-button>
      </form>
    </div>

    <div class="app-auth__footer">
      <!-- <span class="line">OR</span> -->
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

import * as Api from '@/api'
import { setCookie } from 'nookies'


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
      passwordVisiblity: false,
      password: null,
      email: null,
    }
  },
  methods: {

    async handleSignUp() {
      const data = {
        email: this.email,
        password: this.password,
        fullName: this.fullName
      }
      try {
        const { token } = await Api.auth.register(data)

        setCookie(null, "_token", token, { path: "/" })

        this.$router.push('/')
      } catch(err) {
        console.log(err)
      }
    },
  },
}
</script>

<style>
</style>