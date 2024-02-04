<template>
  <div class="upload-list">
    <div class="upload-list__header">
      <span class="upload-list__header-title">Загрузка</span>
      <div class="upload-list__header-actions">
        <span class="underscore-icon"><el-icon><SemiSelect /></el-icon></span>
        <span><el-icon><CloseBold /></el-icon></span>
      </div>
    </div>
    <div class="upload-list__body">
      <div v-for="(file, i) in filesStore.getUploadingFiles" :key="i" class="upload-list__item">
        <div class="upload-list__item-icon">
          <img src="" alt="">
        </div>
        {{ file.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue"
import { useFilesStore } from "../stores/files"
import { supabase } from '@/core/supabaseClient'

import { ArrowDown, CloseBold, SemiSelect } from '@element-plus/icons-vue'

const filesStore = useFilesStore()

let filePreview = ref('')

const reader = new FileReader();

reader.onload = function (e) {
  // get loaded data and render thumbnail.
  filePreview.value = e.target.result
}
// read the image file as a data URL.
reader.readAsDataURL(filesStore.getUploadingFiles[0]);


console.log('FILES: ', filesStore.getUploadingFiles[0], filePreview.value)
</script>

<style lang="scss">
.upload-list {
  max-width: 450px;
  width: 100%;
  min-width: 15%;
  // background: coral;
  position: fixed;
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
  right: 0;
  bottom: 0;
  border-radius: 10px 0px 0 0;
  overflow: hidden;
  z-index: 101;
  border: 1px solid #EBEEF5;

  &__header {
    background: #67c23a;
    padding: 10px 20px;
    color: #fff;
    display: flex;
    align-items: center;

    &-title {
      font-size: 17px;
    }

    &-actions {
      margin-left: auto;
      display: flex;
      gap: 10px;

      .underscore-icon {
        // margin-top: 1px;
      }
    }
  }

  &__body {
    background: #fff;
    padding: 10px 20px;
  }

  &__item {
    padding: 10px;
    display: flex;
    // width: 60px;
    // height: 60px;
    // background-size: cover;
  }
}
</style>