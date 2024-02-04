<template>
  <div class="list-item">
    <div class="list-item__icon" v-if="isImage(item.metadata.mimetype)">
      <!-- <i class="list-item__ext" :class="color">{{ ext }}</i> -->


      <!-- <preview :item="item"></preview> -->

      <!-- {{ item.name }} -->

      <el-image @dblclick="showPreview(publicURL+item.name)" :src="publicURL+item.name" alt="" />

      <el-dialog
        v-model="centerDialogVisible"
        title="Warning"
        width="30%"
        align-center
      >
        <!-- <video :src="videoURL" controls ></video> -->
        <img :src="videoURL" alt="">
      </el-dialog>
      <!-- <el-image
        style="width: 100px; height: 100px"
        ref="imageEl"
        :src="publicURL+item.name"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="1"
        :preview-src-list="photos"
        fit="cover"
        :initial-index="idx"
        @show="showView"
        @switch="clickHandle(e)"
        @dblclick="showPreview"
      >
      </el-image> -->
    </div>
    <!-- <div class="list-item__video" v-if="isVideo(item.metadata.mimetype)">
      <video :src="publicURL+item.name" style="cursor: pointer" @dblclick="showVideo(publicURL+item.name)"></video>

      <el-dialog
        v-model="centerDialogVisible"
        title="Warning"
        width="30%"
        align-center
      >
        <video :src="videoURL" controls ></video>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
  
    </div>
    <div class="list-item__info">
      <div class="list-item__name">
        <span>{{ item.name }}</span>
      </div>
      <div v-if="viewIsList" class="list-item__size">{{ formatFileSize(item.metadata.size, true) }}</div>
      <div v-if="viewIsList" class="list-item__type">{{ item.metadata.mimetype }}</div>
    </div> -->
  </div>
</template>

<script setup>
import filePdfBox from '~icons/mdi/file-pdf-box';
import filePdfOutlined from '~icons/ant-design/file-pdf-outlined';
import fileDocumentOutline from '~icons/mdi/file-document-outline';

import Preview from './preview/Preview.vue'


import { computed, nextTick, onMounted, ref, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"
import { formatFileSize } from "@/utils/formatFileSize.js"
import { supabase } from '@/core/supabaseClient'
import { useFilesStore } from '../stores/files';

const isVideo = ext => ["video/mp4"].includes(ext)
const isImage = ext => ["image/jpeg", "image/png"].includes(ext)

const filesStore = useFilesStore()

const photos = ref([])

const videoURL = ref('')


const centerDialogVisible = ref(false)
// el-image-viewer__wrapper


const showPreview = (e) => {
  console.log('SHOWPREVIEW ')
    videoURL.value = e
  centerDialogVisible.value = true
}


const clickHandle = (e) => {
  console.log('SWITHCED')

}

const showVideo = (e) => {
  console.log('showVideo')
  videoURL.value = e
  centerDialogVisible.value = true
}

const imageEl = ref()
const showView = () => {
  nextTick(() => {

    const actionEl = imageEl.value.$el.querySelector('.el-image-viewer__actions__inner')
    const loadIcon = document.createElement('i')
    loadIcon.className = 'el-icon'
    loadIcon.innerHTML = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"></path></svg>`
    loadIcon.addEventListener('click', () => {
      filesStore.downloadFile(imageEl.value)
    })
    actionEl.appendChild(loadIcon)
  })
}

const publicURL = ref('')

const viewIsList = computed(() => {
  return filesStore.view === 'by-list'
})

const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/')

publicURL.value = data.publicUrl

const props = defineProps({ item: Object, idx: Number })

const { item, idx } = toRefs(props)

const ext = getExtensionFromFileName(item.value.name);
const color = getColorByExtension(ext)

onMounted(async () => {
  let m = await filesStore.fetchPhotos()
   m = m.filter(el => isImage(el.metadata.mimetype) )
   m.map(el => {
    photos.value.push(publicURL.value+el.name)
  })
})
</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}


.viewer-box {
  position: absolute;
  top: 40px;
  left: calc(50vw - 100px);
  width: 200px;
  text-align: center;
  color: #fff;
}
</style>