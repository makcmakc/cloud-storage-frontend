<template>
  <div class="wrapper">

    <div class="auth-wrapper">
      <div class="auth-wrapper__left">
        <div class="auth-img">
          <!-- <img src="@/assets/cloud.svg" alt=""> -->
        </div>
        <div class="auth-desc">
          The VCloud is the ultimate tool for managing all of your files in one central location.
        </div>
      </div>

      <div class="auth-wrapper__right">
        <template v-if="authType === '__SIGNIN__'">
          <LoginForm @auth-type="updateType" />
        </template>

        <template v-if="authType === '__SIGNUP__'">
          <RegisterForm @auth-type="updateType" />
        </template>
      </div>

    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { ref, reactive } from 'vue'

let authType = ref('__SIGNIN__')

const updateType = type => authType.value = type
</script>

<style lang="scss">
.auth-wrapper {
  display: flex;
  padding-left: 2.5rem;
  padding-right: 2.5rem;

  &__left {
    width: 50%;
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__right {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('@/assets/login-bg.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
  }
}

.auth {
  &-img {
    margin-top: -200px;
    img {
      width: 400px;
    }
  }

  &-desc {
    width: 50%;
    color: #fff;
    font-size: 1.575rem;
    line-height: 2.25rem;
    font-weight: 500;
  }
}

.app-auth {
  margin-top: -120px;
  max-width: 480px;
  width: 100%;

  &__header {
  }

  &__title {
    font-size: 26px;
    // color: #eee;
    margin: 0 auto 20px auto;
    // text-align: left;
    font-weight: 700;
  }

  &__content {
  }

  &__signup {
    margin-top: 20px;
    text-align: right;

    button {
      padding: 8px 20px;
      border: 1px solid #ccc;
      background: none;
      display: inline-block;
      cursor: pointer;
      width: 100%;
      height: 44px;
      transition: all .15s;

      &:hover {
        border-color: #41b883;
        color: #41b883;
        transition: all .15s;
      }
    }
  }

  .line {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    grid-column-gap: 1.2rem;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #606266;

    &::before,
    &::after {
      content: "";
      display: block;
      height: 1px;
      background-color: #DCDFE6;
    }
  }
}


.auth-form__fieldset {
  padding: 0;
  margin-bottom: 22px;
  border-radius: 5px;
  border: none;
}

.auth-form__btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 600;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: #41b883;
  border: var(--el-border);
  border-color: #41b883;
  padding: 8px 15px;
  font-size: 15px;
  border-radius: 4px;
  // margin-top: 20px;
  width: 100%;
  height: 44px;
}

.text-field {
  padding: 0;
  position: relative;


  &__inner {
    height: 40px;
    // width: 85%;
    width: 100%;
    border-radius: 4px;
    outline: none;
    // background: transparent;
    // border: none;
    // border-top-color: currentcolor;
    // border-right-color: currentcolor;
    // border-bottom-color: currentcolor;
    // border-left-color: currentcolor;
    // -webkit-appearance: none;
    // box-shadow: none;
    padding: 12px 40px 12px 40px;
    // color: #fff;
    height: 47px;
    // caret-color: #fff;
      border: 1px solid #EBEEF5;

    &:focus,
    &:hover {
      border: 1px solid #41b883;
      box-shadow: none;
    }
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