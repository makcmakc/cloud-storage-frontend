<script setup>
import { ref, toRefs, watch } from 'vue'
import { supabase } from '@/core/supabaseClient'
import { useFilesStore } from '@/stores/files'


const filesStore = useFilesStore()


const prop = defineProps(['path', 'size'])
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars/public').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
 
    filesStore.uploadFiles(files.value)
    // const fileExt = file.name.split('.').pop()
    // const filePath = `${Math.random()}.${fileExt}`

    // const { error: uploadError } = await supabase.storage.from('avatars/public').upload(filePath, file)

    // if (uploadError) throw uploadError
    // emit('update:path', filePath)
    // emit('upload')

    // console.log('UPLOAD DONE!!!', file)
    // await filesStore.fetchFiles()
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

// watch(path, () => {
//   if (path.value) downloadImage()
// })
</script>

<template>
  <div>
    <!-- <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      :style="{ height: size + 'em', width: size + 'em' }"
    /> -->
    <!-- <div v-else class="avatar no-image" :style="{ height: size + 'em', width: size + 'em' }" /> -->


      <label class="el-button el-button--success el-button--large btn--upload" for="single">
        Загрузить файл
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        multiple
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
  </div>
</template>


<style lang="scss" scoped>
:deep(.btn--upload) {
  width: 100%;
}
</style>


<!-- <template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :on-change="uploadFile"

  >
      :on-change="uploadFile"
    <template #trigger>
      <el-button class="btn btn--upload" type="success" size="large" @click="submitUpload">
        Загрузить файл
      </el-button>
    </template>
  </el-upload>
</template>


<script setup>
import cloudUploadOutline from '~icons/mdi/cloud-upload-outline'
import * as Api from '@/api'
import { supabase } from '@/core/supabaseClient'
import { ref } from 'vue';

const file = ref(null)
const form = ref(null)

const files = ref([])

const uploadFile = async ($event) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}
</script>


<style lang="scss" scoped>

.el-upload,
.el-upload .el-button {
  width: 100% !important;
}

:deep(.el-upload) {
  width: 100%;
}

.btn {
  position: relative;
  height: 42px;
  width: 100%;
  // background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: 0.2s background;

  &:hover {
    // background: darken(hsla(160, 100%, 37%, 1), 5%);
    transition: 0.2s background;
  }
}

.btn.btn--upload {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // gap: 12px;
  // font-size: 15px;
  // color: #fff;

  // span {
  //     font-weigh 
  // }

  // svg {
  //   margin-top: 4.5px;
  // }
}

// .upload-button__attach {
//   display: block;
//   z-index: 1;
//   position: absolute;
//   left: 0;
//   width: 100%;
//   bottom: 0;
//   height: 200%;
//   opacity: 0;
//   cursor: pointer;
// }

// .upload-button__attach-wrapper {
//   overflow: hidden;
//   position: absolute;
//   right: -20px;
//   left: -33px;
//   bottom: 0;
//   top: 0;
// }

</style>
 -->
