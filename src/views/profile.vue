<template>
  <div>
    <div class="wrapper">
      <div>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <strong>{{userData.id}}</strong>
        </p>
        <p>
          Полное имя: <strong>{{userData.fullName}}</strong>
        </p>
        <p>
          E-Mail: <strong>{{userData.email}}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'

export default {
  name: 'profile',
  data() {
    return {
      userData: {}
    }
  },
  async mounted() {
    this.userData =  await Api.auth.getMe();
  }
}
</script>

<style>
strong {
  font-weight: 800;
}
p {
  margin-bottom: 5px;
}
</style>