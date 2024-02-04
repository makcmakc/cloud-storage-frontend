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
        <!-- <template v-if="authType == '__SIGNIN__'"> -->
          <LoginForm @auth-type="updateType" />
        <!-- </template> -->

        <!-- <template v-if="authType == '__SIGNUP__'">
          <RegisterForm @auth-type="updateType" />
        </template> -->
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

    button {
      width: 100%;
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
  width: 100%;
}
</style>