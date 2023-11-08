<template>
  <header>
    <div class="wrapper">
      <div class="app-header">
        <router-link to="/" class="app-logo">
          <div class="app-logo__icon">
            <appleIcloud style="font-size: 2em" />
          </div>
          <div class="app-logo__title">Cloud Storage</div>
        </router-link>

        <div class="app-settings" style="display: flex; align-items: center; gap: 10px">
          <!-- <div style="">
          <activityIcon style="font-size: 1.5em;" /> Activity
          </div> -->

          <div class="app-header__profile">
            <n-popover
              placement="bottom"
              trigger="hover"
              @update:show="handleUpdateShow">
              <template #trigger>
                <div>
                  <n-avatar
                    round
                    size="small"
                    src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg"
                  />
                  Profile
                </div>
              </template>

              <div class="profile-popover">
                <div class="profile-popover__head">
                  <div class="profile-popover__head-avatar">
                  <n-avatar
                    round
                    :size="62"
                    src="https://www.kino-teatr.ru/movie/kadr/147388/1035815.jpg"
                  />
                  </div>
                  <div class="profile-popover__head-info">
                    <p>Полное имя: <strong>{{ userData.fullName }}</strong></p>
                    <p>E-Mail: <strong>{{ userData.email }}</strong></p>
                    <p>ID: <strong>{{ userData.id }}</strong></p>
                  </div>
                </div>
                <div class="profile-popover__body">

                </div>
                <div class="profile-popover__footer">
                  <div @click="logout" style="display: flex; align-items: center; margin-left: auto; cursor: pointer;">
                    <span style="margin-right: 5px">Exit</span>
                    <baselineExitToApp />
                  </div>
                </div>
              </div>
            </n-popover>
          </div>
        </div>
      </div>

      <div class="app-action-bar">
        <div class="action-bar__body">
          <div class="action-bar__item">
            <div class="action-bar__item-icon"></div>
            <div class="action-bar__item-text"></div>
          </div>
        </div>
        <div class="action-bar__anchor">
          <closeIcon />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import appleIcloud from '~icons/mdi/apple-icloud'
import cogIcon from '~icons/mdi/cog'
import closeIcon from '~icons/mdi/close'
import profileCircle from '~icons/iconoir/profile-circle'
import infoFilled from '~icons/ep/info-filled'
import activityIcon from '~icons/mynaui/activity'
import baselineExitToApp from '~icons/ic/baseline-exit-to-app';
</script>


<script>
import * as Api from '@/api'

export default {
  data() {
    return {
      userData: {}
    }
  },
  async mounted() {
    this.userData = await Api.auth.getMe()
  },
  methods: {
    async logout() {
      await Api.auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 20px;
  width: 100%;
  // background: #f4f6f9;
  background: #fff;
}

.profile-popover {
  width: 250px;

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.profile-popover__head {
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  &-avatar {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
}

.app-header {
  display: flex;
  align-items: center;
  height: 60px;
}

.app-settings {
  margin-left: auto;

  &__content {
    position: absolute;
    right: 20px;
    top: 50px;
    width: 200px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    z-index: 99;
  }
}

.app-logo {
  display: flex;
  align-items: center;
  color: #000;
  width: max-content;

  &__icon {
    margin-right: 10px;
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
  }
}

.action-bar__anchor {
  margin-right: 10px;
}

.app-action-bar {
  --layout-outer-margin: 20px;

  width: auto;
  left: var(--layout-outer-margin);
  right: calc(var(--layout-outer-margin) - 100vw + 100%);
  border-radius: 0 0 12px 12px;
  position: fixed;
  top: 0;
  color: #fff;
  background-color: #222;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  height: 60px;
  transition: opacity 0.3s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 50;
}
</style>