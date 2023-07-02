<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title">Sign In</h3>
    </div>

    <div class="app-auth__content">
      <form class="auth-form" @submit.prevent="handleSignIn">
        <div class="auth-form__fieldset">
          <div class="text-field">
            <span class="text-field__preffix">
              <baselineEmail />
            </span>
            <input v-model="email" class="text-field__inner" placeholder="E-mail" />
          </div>
        </div>

        <div class="auth-form__fieldset">
          <div class="text-field">
            <span class="text-field__preffix">
              <lockIcon />
            </span>
            <input
              v-model="password"
              :type="passwordVisiblity ? 'text' : 'password'"
              class="text-field__inner"
              placeholder="Password"
            />
            <span class="text-field__suffix" @click="passwordVisiblity = !passwordVisiblity">
              <eyeIcon v-if="!passwordVisiblity" />
              <eyeOff v-else />
            </span>
          </div>
        </div>

        <button type="submit" class="auth-form__btn">Sign In</button>
      </form>
    </div>

    <div class="app-auth__footer">
      <span class="line">OR</span>

      <div class="app-auth__signup" @click="this.$emit('auth-type', '__SIGNUP__')">
        <button>Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import lockIcon from '~icons/mdi/lock';
import eyeIcon from '~icons/mdi/eye';
import eyeOff from '~icons/mdi/eye-off';
import baselineEmail from '~icons/ic/baseline-email';

import * as Api from '@/api'
import { setCookie } from 'nookies'

export default {
  name: 'login-form',
  components: {
    lockIcon,
    eyeIcon,
    eyeOff,
    baselineEmail
  },
  data() {
    return {
      passwordVisiblity: false,
      password: null,
      email: null,
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
    check() {
      
    }
  }
}
</script>

<style>
</style>