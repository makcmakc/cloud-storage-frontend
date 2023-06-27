<template>
  <header>
    <div class="wrapper">
      <div class="app-header">
        <router-link to="/" class="app-logo">
          <div class="app-logo__icon">
            <appleIcloud style="font-size: 2em;" />
          </div>
          <div class="app-logo__title">
            Cloud Storage
          </div>
        </router-link>

        <div class="app-settings" ref="settings">
          <router-link to="/auth">
            <cogIcon style="font-size: 1.4em; margin-top: 6px;"  @click="isOpen = !isOpen" />
          </router-link>
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
import appleIcloud from '~icons/mdi/apple-icloud';
import cogIcon from '~icons/mdi/cog';
import closeIcon from '~icons/mdi/close';
import { onMounted, onUnmounted, ref } from 'vue';

  let isOpen = ref(false)

</script>

<style lang="scss" scoped>
header {
  margin-bottom: 20px;
  width: 100%;
  background: #f4f6f9;
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
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.15);


  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  height: 60px;
  transition: opacity .3s ease;
  opacity: 0;
  pointer-events: none;
  z-index: 50;
}
</style>