<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title">Sign In</h3>
    </div>

    <div class="app-auth__content">
      <form class="auth-form">
        <el-form-item class="auth-form__fieldset">
          <el-input
            size="large"
            :prefix-icon="Message"
            v-model="email"
            placeholder="E-mail"
            @focus="focusInput($event)"
            @blur="blurInput($event)"
          />
        </el-form-item>

        <el-form-item class="auth-form__fieldset">
          <el-input
            type="password"
            show-password
            placeholder="Password"
            size="large"
            v-model="password"
            :prefix-icon="Lock"
            @focus="focusInput($event)"
            @blur="blurInput($event)"
          />
        </el-form-item>

        <el-button class="auth-form__btn"
          type="success"
          :loading="loading"
          @click="handleSignIn"
          size="large"
        >
          Sign In
        </el-button>
      </form>
    </div>

    <div class="app-auth__footer">
      <el-divider>OR</el-divider>

      <div class="app-auth__actions">
        <el-button type="default" plain class="auth-with-github" @click="handleOAuthGithub">
          <el-icon class="el-icon--left"><img style="width: 15px;" src="@/assets/github.svg"></el-icon>Github
        </el-button>
        <el-button type="default" plain class="auth-with-telegram" @click="handleOAuthTelegram">
          <el-icon class="el-icon--left"><img style="width: 15px;" src="@/assets/telegram.svg"></el-icon>Telegram
        </el-button>     
        <el-button type="default" plain class="default--overwrite" @click="handleSwitchAuth">
          <el-icon class="el-icon--left"><User /></el-icon>Sign Up
        </el-button>
      </div>      
    </div>
  </div>
</template>


<script setup>
import { Message, Lock, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { supabase } from '@/core/supabaseClient'
// import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const loading = ref(false)
const email = ref('')
const password = ref('')

const emit = defineEmits()

const router = useRouter()

const handleSwitchAuth = () => emit('auth-type', '__SIGNUP__')

// Customization of default Element Input
// TODO: rewrite it in a better way
const focusInput = e => {
  e.target.parentNode.style.boxShadow = "0 0 0 1px #67C23A inset";

  setTimeout(() => {
    if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('is-error')) {
      e.target.parentNode.style.boxShadow = "0 0 0 1px #f56c6c inset";
    }
  }, 0)
}
const blurInput = e => {
  e.target.parentNode.style.boxShadow = "0 0 0 1px #dcdfe6 inset"

  setTimeout(() => {
    if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('is-error')) {
      e.target.parentNode.style.boxShadow = "0 0 0 1px #f56c6c inset";
    }
  }, 0)
}

const handleOAuthTelegram = () => {

}

const handleOAuthGithub = () => {

}

// const handleLogin = async () => {
//   try {
//     loading.value = true
//     const { error } = await supabase.auth.signInWithOtp({
//       email: email.value,
//     })
//     if (error) throw error
//     alert('Check your email for the login link!')
//   } catch (error) {
//     if (error instanceof Error) {
//       alert(error.message)
//     }
//   } finally {
//     loading.value = false
//   }
// }

const handleSignIn = async () => {
  try {

    console.log(email.value, password.value)
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      console.log(error)
      return
    }

    router.push('/')
  } catch (error) {
    ElMessage.error('Oops, this is a error message.', error)
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
.el-divider__text {
  // background: #f4f6f9;
  color: #606266;
}
</style>