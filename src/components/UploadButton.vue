<template>
  <!-- <button class="btn btn--upload">
    <i class="btn-icon"><cloudUploadOutline /></i>
    <div class="upload-button__attach-wrapper">
      <input
        ref="file"
        type="file"
        class="upload-button__attach"
        @change="uploadFile($event)"
        title="Загрузить файлы"
      />
    </div>
    <span>Загрузить файл</span>
  </button> -->
      <!-- <n-upload
        @change="uploadFile($event)"
        :headers="{
          'naive-info': 'hello!'
        }"
        :data="{
          'naive-data': 'cool! naive!'
        }"
      >
        <n-button icon-placement="left" size="large" type="primary" style="width: 100%">
          <template #icon>
            <n-icon>
              <cloudUploadOutline />
            </n-icon>
          </template>
         Загрузить файл
        </n-button>
      </n-upload> -->

  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      style="width: 10em; height: 10em;"
    />
    <div v-else class="avatar no-image" :style="{ height: size, width: size }" />

    <!-- <div style="width: 10em; position: relative;">
      <label class="button primary block" for="single">
        {{ uploading ? 'Uploading ...' : 'Upload' }}
      </label>
      <input
        style="position: absolute; visibility: hidden;"
        type="file"
        id="single"
        accept="image/*"
        @change.native="uploadFile"
        :disabled="uploading"
      />
    </div> -->

      <n-upload
        @change="uploadFile($event)"
        :headers="{
          'naive-info': 'hello!'
        }"
        :data="{
          'naive-data': 'cool! naive!'
        }"
      >
        <n-button icon-placement="left" size="large" type="primary" style="width: 100%">
          <template #icon>
            <n-icon>
              <cloudUploadOutline />
            </n-icon>
          </template>
         Загрузить файл
        </n-button>
      </n-upload>    
  </div>

</template>


<script setup>
import cloudUploadOutline from '~icons/mdi/cloud-upload-outline'
import * as Api from '@/api'
import { supabase } from '@/core/supabaseClient'
import { ref } from 'vue';
// import { useMessage } from 'naive-ui'

const file = ref(null)
const form = ref(null)
// const message = useMessage()

const uploadFile = async ($event) => {
  const file = $event.file.file

  try {
    // const { error } = await supabase
    //   .storage
    //   .from('avatars')
    //   .upload('public' + '/' + file.name, file)
    // if (error) message.error(error)
    await Api.files.uploadFile(file)
    window.location.reload()
  } catch( e) {
    console.log(e)
  }




  // try {

  //   const file = $event.target.files[0];

  //   console.log(file)

  //   if (file !== undefined) {
  //     await Api.files.uploadFile(file)
  //     window.location.reload()
  //   }
  // } catch (error) {
  //   console.log(error)
  // }

}
</script>


<style lang="scss" scoped>

.n-button,
.n-upload-trigger {
  width: 100% !important;
}

.btn {
  position: relative;
  height: 42px;
  width: 100%;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: 0.2s background;

  &:hover {
    background: darken(hsla(160, 100%, 37%, 1), 5%);
    transition: 0.2s background;
  }
}

.btn.btn--upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 15px;
  color: #fff;

  span {
      font-weight: 600;
  }

  svg {
    margin-top: 4.5px;
  }
}

.upload-button__attach {
  display: block;
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 200%;
  opacity: 0;
  cursor: pointer;
}

.upload-button__attach-wrapper {
  overflow: hidden;
  position: absolute;
  right: -20px;
  left: -33px;
  bottom: 0;
  top: 0;
}

</style>

