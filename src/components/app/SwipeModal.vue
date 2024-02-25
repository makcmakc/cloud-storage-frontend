<template>
  <!-- <div> -->
    <el-icon class="settings-mobile" @click="open" style="transform: rotate(90deg);"><MoreFilled /></el-icon>
  <!-- </div> -->

  <div class="setting-modal" v-if="isOpen">
    <div class="setting-modal__trigger">

    </div>
    <div class="setting-modal__content">
      asdlasjdlkjas
    </div>
  </div>
</template>

<script setup>
import { MoreFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
  console.log("open swipe modal")
}
</script>

<style lang="scss">
.setting-modal {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 23px;
  background: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 40%;
  border-radius: 1.5rem 1.5rem 0 0;
}
</style>