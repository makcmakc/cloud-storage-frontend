<template>
  <div class="wrapper">
    <div class="app-auth">

      <div class="app-auth__header">
        <h3 class="app-auth__title">Register Form</h3>
      </div>
      
      <div class="app-auth__content">
        <form class="auth-form" @submit.prevent="submitHandler">
          <fieldset class="auth-form__fieldset">
            <div class="text-field">
              <span class="text-field__preffix">
                <emailIcon />
              </span>
              <input v-model="email" class="text-field__inner" placeholder="E-mail" />
            </div>
          </fieldset>

          <fieldset class="auth-form__fieldset">
            <div class="text-field">
              <span class="text-field__preffix">
                <accountIcon />
              </span>
              <input v-model="fullName" class="text-field__inner" placeholder="Full Name" />
            </div>
          </fieldset>

          <fieldset class="auth-form__fieldset">
            <div class="text-field">
              <span class="text-field__preffix">
                <lockIcon />
              </span>
              <input v-model="password" :type="passwordVisiblity ? 'text' : 'password'" class="text-field__inner" placeholder="Password" />
              <span class="text-field__suffix" @click="passwordVisiblity = !passwordVisiblity">
                <eyeIcon v-if="!passwordVisiblity" />
                <eyeOff v-else />
              </span>
            </div>
          </fieldset>

          <button class="auth-form__btn">Submit</button>
        </form>
      </div>

    </div>  
  </div>
</template>

<script>
import accountIcon from '~icons/mdi/account';
import lockIcon from '~icons/mdi/lock';
import eyeIcon from '~icons/mdi/eye';
import eyeOff from '~icons/mdi/eye-off';
import emailIcon from '~icons/mdi/email';
import * as Api from '@/api'
import { setCookie } from 'nookies'

export default {
  name: 'auth',
  components: {
    accountIcon,
    lockIcon,
    eyeIcon,
    eyeOff,
    emailIcon
  },
  data() {
    return {
      passwordVisiblity: false,
      password: null,
      email: null,
      fullName: null
    }
  },
  methods: {
    async submitHandler() {
      const data = {
        email: this.email,
        password: this.password,
        fullName: this.fullName
      }
      try {
        const {token} = await Api.auth.register(data)

        setCookie(null, "_token", token, { path: "/" })

        this.$router.push('/')
      } catch(err) {
        console.log(err)
      }
    }
  },
  mounted() {
    console.log(this.$route.meta.layout)
    if (this.$route.meta.layout === 'empty') {
      document.body.style.background = '#2d3a4b'
    }
  }
}
</script>

<style lang="scss">
.app-auth {
  margin: 0 auto;
  max-width: 400px;
  position: relative;
  top: 200px;

  &__header {

  }

  &__title {
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
  }

  &__content {

  }
}

.auth-form {
  // border: 1px solid #EBEEF5;
}

.auth-form__fieldset {
  padding: 0;
  // border: none;
  margin-bottom: 22px;
  border: 1px solid hsla(0,0%,100%,.1);
background: rgba(0,0,0,.1);
border-radius: 5px;
}

.auth-form__btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  // height: 47px;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 600;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: #409EFF;
  border: var(--el-border);
  border-color: #409EFF;
  padding: 8px 15px;
  font-size: 15px;
  border-radius: 4px;
  // margin-top: 20px;
  width: 100%;
  height: 38px;
}

.text-field {
  padding: 0;
  position: relative;

  &__inner {
    height: 40px;
    // width: 85%;
    width: 100%;
    border-radius: 4px;
    background: transparent;
    border: 0;
    border-top-color: currentcolor;
    border-right-color: currentcolor;
    border-bottom-color: currentcolor;
    border-left-color: currentcolor;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 40px 12px 40px;
    color: #fff;
    height: 47px;
    caret-color: #fff;

    &:focus {}
  }

  &__preffix {
    position: absolute;
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    top: 7px;
    left: 0px;
  }

  &__suffix {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
    line-height: 36px;
  }
}


</style>