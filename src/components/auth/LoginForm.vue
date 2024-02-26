<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title  enter-x">Sign In</h3>
    </div>

    <div class="app-auth__content">
      <form class="auth-form">
        <el-form-item class="auth-form__fieldset enter-x">
          <el-input
            size="large"
            :prefix-icon="Message"
            v-model="email"
            placeholder="E-mail"
            @focus="focusInput($event)"
            @blur="blurInput($event)"
          />
        </el-form-item>

        <el-form-item class="auth-form__fieldset enter-x">
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

        <el-button class="auth-form__btn enter-x"
          type="success"
          :loading="loading"
          @click="handleSignIn"
          size="large"
        >
          Sign In
        </el-button>
      </form>
    </div>

    <div class="app-auth__footer enter-x">
      <el-divider>OR</el-divider>
      <div class="app-auth__actions">
        <el-button type="default" plain class="auth-with-github" @click="handleOAuthGithub">
          <el-icon class="el-icon--left"><img style="width: 15px;" src="@/assets/github.svg"></el-icon>Github
        </el-button>
        <el-button type="default" plain class="auth-with-telegram" @click="handleOAuthTelegram">
          <el-icon class="el-icon--left"><img style="width: 15px;" src="@/assets/telegram.svg"></el-icon>Telegram
        </el-button>     
        <el-button type="default" plain class="auth-signup default--overwrite" @click="handleSwitchAuth">
          <el-icon class="el-icon--left"><User /></el-icon>Sign Up
        </el-button>
      </div>      
    </div>
  </div>
</template>

<script setup>
import { Message, Lock, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const loading = ref(false)
const email = ref('')
const password = ref('')

const router = useRouter()
const authStore = useAuthStore()
const emit = defineEmits()

const handleSwitchAuth = () => emit('auth-type', '__SIGNUP__')
const focusInput = e => e.target.parentNode.style.boxShadow = "0 0 0 1px #67C23A inset";
const blurInput = e => e.target.parentNode.style.boxShadow = "0 0 0 1px #dcdfe6 inset";


const handleOAuthTelegram = () => {}

const handleOAuthGithub = () => {}

const handleSignIn = async () => {
  loading.value = true;
  await authStore.signIn(email.value, password.value)
  loading.value = false
  router.push('/files')
}
</script>

<style lang="scss" scoped>
:deep(.el-divider__text) {
  color: #606266;
}
</style>