<template>
  <div class="app-auth">
    <div class="app-auth__header">
      <h3 class="app-auth__title">Sign Up</h3>
    </div>

    <div class="app-auth__content">
      <el-form class="auth-form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        >

        <el-form-item prop="email" class="auth-form__fieldset">
          <el-input
            size="large"
            class="default--overwrite"
            type="success"
            :prefix-icon="Message"
            v-model="ruleForm.email"
            placeholder="E-mail"
            @focus="focusInput($event)"
            @blur="blurInput($event)"
          />
        </el-form-item>

        <el-form-item  prop="fullName" class="auth-form__fieldset">
          <el-input
            size="large"
            :prefix-icon="User"
            v-model="ruleForm.fullName"
            placeholder="Full Name"
            @focus="focusInput($event)"
            @blur="blurInput($event)"
          />
        </el-form-item >     

        <el-form-item prop="pass" class="enter-x">
          <div style="width: 100%;">
            <el-input
              v-model="ruleForm.password"
              autocomplete="off"
              type="password"
              show-password
              placeholder="Password"
              size="large"
              :prefix-icon="Lock"
              @focus="focusInput($event)"
              @blur="blurInput($event)"              
            />
            <StrengthMeter
              v-model:value="ruleForm.password"
              @score-change="scoreChange"
            />
          </div>
        </el-form-item>

        <el-form-item prop="checkPass" class="enter-x">
          <el-input
            type="password"
            show-password
            placeholder="Confirm Password"
            size="large"
            autocomplete="off"
            v-model="ruleForm.checkPass"
            :prefix-icon="Lock"
            @focus="focusInput($event)"
            @blur="blurInput($event)"             
          />
        </el-form-item>

        <el-button
          type="success"
          attr-type="submit"
          :loading="loading"
          @click="handleSignUp"
          size="large"
          class="auth-form__btn"
          >
          Sign Up
        </el-button>
      </el-form>
    </div>
    
    <el-button @click="seeUser">seeUser</el-button>
    <el-button @click="logout">logout</el-button>

    <div class="app-auth__footer">
      <el-button
        size="large"
        plain
        class="app-auth__back-to"
        @click="handleSwitchAuth"
      >
        Back to Sign In
      </el-button>
    </div>
  </div>
</template>


<script setup>
import { supabase } from '@/core/supabaseClient'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Lock, User, PictureFilled } from '@element-plus/icons-vue'
import { onMounted, reactive, ref, toRefs } from 'vue'
// import AvatarUpload from './AvatarUpload.vue'

const ruleFormRef = ref()
const loading = ref(false)
const passwordScore = ref(0)

const router = useRouter()
const emit = defineEmits()

// const user = ref()


const props = defineProps(['session'])
const { session } = toRefs(props)

// console.log(session.value)

// const avatar_url = ref()

// onMounted(() => {
//   getProfile()
// })

const ruleForm = reactive({
  email: '',
  fullName: '',
  password: '',
  checkPassword: '',
  avatar_url: ''
})

// async function getProfile() {
//   try {
//     loading.value = true
//     const { user } = session.value

//     const { data, error, status } = await supabase
//       .from('profiles')
//       .select(`full_name, email, password, avatar_url`)
//       .eq('id', user.id)
//       .single()

//     if (error && status !== 406) throw error

//     if (data) {
//       console.log('Get profile DATA : ', data)
//       // username.value = data.username
//       // website.value = data.website
//       // avatar_url.value = data.avatar_url
//     }
//   } catch (error) {
//     alert('getProfile - ' + error.message)
//   } finally {
//     loading.value = false
//   }
// }



const scoreChange = score => passwordScore.value = score
const handleSwitchAuth = () => emit('auth-type', '__SIGNIN__')

async function handleSignUp() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: ruleForm.email,
      password: ruleForm.password,
      options: {
        data: {
          full_name: ruleForm.fullName,
        }
      }
    })

    console.log('auth data', data)
    
    if (error) throw error

    router.push('/')

  } catch (error) {
    alert('Alert err : ' + error.message)
  } finally {
    loading.value = false
  }
}


const seeUser = async () => {
 const lu = await supabase.auth.getSession()
 console.log(lu)
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) throw error

  console.log('logout')
}



// Customization of default Element Input
// TODO: rewrite it in a better way
const focusInput = e => {
  e.target.parentNode.style.boxShadow = "0 0 0 1px #67C23A inset";

  setTimeout(() => {
    if (e.target?.parentNode?.parentNode?.parentNode?.parentNode?.classList?.contains('is-error')) {
      e.target.parentNode.style.boxShadow = "0 0 0 1px #f56c6c inset";
    }
  }, 0)
}
const blurInput = e => {
  e.target.parentNode.style.boxShadow = "0 0 0 1px #dcdfe6 inset"

  setTimeout(() => {
    if (e.target?.parentNode?.parentNode?.parentNode?.parentNode?.classList?.contains('is-error')
    || e.target?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.classList?.contains('is-error')) {
      e.target.parentNode.style.boxShadow = "0 0 0 1px #f56c6c inset";
    }
  }, 0)
}


// validation
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Пожалуйста введите пароль'))
  } else if (passwordScore.value < 3) {
    callback(new Error('Слишком слабый пароль'))
  } else {
    if (ruleForm.checkPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPassword', () => null)
    }
    callback()
  }
}

const validatePasswordConfirm = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Пожалуйста повторите пароль'))
  } else if (value !== ruleForm.password) {
    callback(new Error("Пароли не совпадают!"))
  } else {
    callback()
  }
}

const validateEmail = (rule, value, callback) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

  if (value === '') {
    callback(new Error('Пожалуйста введите E-mail'))
  } else if (!reg.test(ruleForm.email)) {
    callback(new Error('Пожалуйста введите корректный E-mail'))
  } else {
    callback()
  }
}

const validateFullName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Пожалуйста введите Full Name'))
  } else if (value.length < 3 || value.length > 25) {
    callback(new Error('Длина имени должна быть от 3 до 25 символов'))
  } else {
    callback()
  }  
}



const rules = reactive({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  fullName: [{ validator: validateFullName, trigger: 'blur' }],
  pass: [{ validator: validatePassword, trigger: 'blur' }],
  checkPass: [{ validator: validatePasswordConfirm, trigger: 'blur' }],
})

const formValidation = async (formEl) => {
  try {
    await formEl.validate((valid) => {
      if (!valid) return
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
      // return
    })
  } catch (e) {}
}

const submitForm = async (formEl) => {

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', fields)
    } else {
      console.log('error submit!', fields)
    }
  })

  const data = formValidation(formEl)
  if (!data) return
  
  console.log('VALID', data)
}



// const handleSignUp = async () => {
//   try {
//     loading.value = true
//     const { error } = await supabase.auth.signUp({
//       email: ruleForm.email,
//       password: ruleForm.pass,
//       fullName: ruleForm.fullName
//     })

//     if (error) {
//       console.log(error)
//       return
//     }

//     router.push('/')

//   } catch (error) {
//     // ElMessage.error('Oops, this is a error message.', error)
//     console.log(error)
//   } finally {
//     loading.value = false
//   }
// }
</script>
