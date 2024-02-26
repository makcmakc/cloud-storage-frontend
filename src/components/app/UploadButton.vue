<script setup>
import { ref, toRefs, watch } from 'vue'
import { supabase } from '@/core/supabaseClient'
import { useFilesStore } from '@/stores/files'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { useScreenSize } from '@/composables/screenSize.js'

const filesStore = useFilesStore()
const { screenWidth } = useScreenSize()


const prop = defineProps(['path', 'size'])
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

// const downloadImage = async () => {
//   try {
//     const { data, error } = await supabase.storage.from('avatars/public').download(path.value)
//     if (error) throw error
//     src.value = URL.createObjectURL(data)
//   } catch (error) {
//     console.error('Error downloading image: ', error.message)
//   }
// }

// Функция для загрузки файлов
async function uploadFiles(files) {
  const promises = files.map(async (file) => {
    const { data, error } = await supabase.storage.from('avatars').upload(file.name, file);

    if (error) {
      console.error('Ошибка при загрузке файла:', error.message);
    } else {
      console.log('Файл успешно загружен:', data);
    }
  });

  await Promise.all(promises);
  await filesStore.fetchFiles() 
}

// Обработчик события выбора файлов
const uploadAvatar = async (event) => {
  const files = Array.from(event.target.files);
  console.log(files)
  await uploadFiles(files);
}

</script>

<template>
  <span>
    <label class="el-button el-button--success el-button--large btn-upload" for="upload-input" v-if="screenWidth >= 768">
      <span>Загрузить файл</span>
    </label>
    <label for="upload-input" class="btn-upload--icon" v-else>
      <el-icon><CirclePlusFilled /></el-icon>
    </label>

    <input type="file"
      class="input-upload"
      id="upload-input"
      multiple
      @change="uploadAvatar"
      :disabled="uploading"
    />
  </span>
</template>



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
