<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title">Sign In</h3>
    </div>

    <div class="app-auth__content">
      <form class="auth-form" @submit.prevent="handleSignIn">
        <div class="auth-form__fieldset">
          <el-input size="large" :prefix-icon="Message" v-model="email" placeholder="E-mail" />
        </div>

        <div class="auth-form__fieldset">
          <el-input
            type="password"
            show-password
            placeholder="Password"
            size="large"
            v-model="password"
            :prefix-icon="Lock"
          />
        </div>

        <el-button type="success" attr-type="submit" :loading="loading" size="large" class="auth-form__btn">Sign In</el-button>
      </form>
    </div>

    <div class="app-auth__footer">
      <el-divider>OR</el-divider>

      <el-button type="default">
        <el-icon class="el-icon--left"><img style="width: 15px;" src="@/assets/github-mark.svg" alt=""> </el-icon>Github
      </el-button>
      <!-- <div class="app-auth__signup" @click="this.$emit('auth-type', '__SIGNUP__')">
        <el-button type="success" plain size="large">Sign Up</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
// import lockIcon from '~icons/mdi/lock'
// import eyeIcon from '~icons/mdi/eye'
// import eyeOff from '~icons/mdi/eye-off'
// import baselineEmail from '~icons/ic/baseline-email'

// // import { EmailFilled } from '~vicons/ionicons5'

// // import * as Api from '@/api'
// // import { setCookie } from 'nookies'

// export default {
//   name: 'login-form',
//   components: {
//     lockIcon,
//     eyeIcon,
//     eyeOff,
//     baselineEmail,
//     // EmailFilled
//   },
//   data() {
//     return {
//       passwordVisiblity: false,
//       password: null,
//       email: null
//     }
//   },
//   methods: {
//     // async handleSignIn() {
//     //   const data = {
//     //     email: this.email,
//     //     password: this.password
//     //   }
//     //   try {
//     //     const { token } = await Api.auth.login(data)

//     //     setCookie(null, '_token', token, { path: '/' })

//     //     this.$router.push('/')
//     //   } catch (err) {
//     //     console.log(err)
//     //   }
//     // },
//     // check() {}
//   }
// }
</script>


<script setup>
import {
  Message,
  Lock
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { supabase } from '@/core/supabaseClient'
// import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const loading = ref(false)
const email = ref('')
const password = ref('')

// const message = useMessage()
const router = useRouter()

const handleSignIn = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    

    if (error) console.log(error)
    router.push('/')
  } catch (error) {
    // message.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style>
.el-divider__text {
  background: #f4f6f9;
}
</style>