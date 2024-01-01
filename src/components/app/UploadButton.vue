<template>
  <el-upload
    ref="upload"
    :limit="1"

    :auto-upload="false"
  >
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

