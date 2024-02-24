<template>
  <div class="wrapper">

    <div class="auth-wrapper">
      <div class="auth-wrapper__left">
        <div class="auth-img">
          <!-- <img src="@/assets/cloud.svg" alt=""> -->
        </div>
        <div class="auth-desc">
          My personal meme cloud
          <!-- The VCloud is the ultimate tool for managing all of your files in one central location. -->
        </div>
      </div>

      <div class="auth-wrapper__right">
        <template v-if="authType == '__SIGNIN__'">
          <LoginForm @auth-type="updateType" />
        </template>

        <template v-if="authType == '__SIGNUP__'">
          <RegisterForm @auth-type="updateType" />

        </template>
      </div>

    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { supabase } from '@/core/supabaseClient'

const authType = ref('__SIGNIN__')

const updateType = type => authType.value = type

const session = ref()

onMounted(() => {

  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })

    document.body.classList.add('auth-page')
})
onBeforeUnmount(() => {
  document.body.classList.remove('auth-page')
})
</script>

<style lang="scss">

</style>