<template>
  <div>
    <div class="list-item">
      <div class="list-item__icon">
        <i class="list-item__ext" :class="getColorByExtension(getExtensionFromFileName(item.name))">
          {{ getExtensionFromFileName(item.name) }}
        </i>
        <el-image v-if="isImage(item.metadata.mimetype)"
          :src="getOriginSource(item)"
          :alt="item.name"
          fit="scale-down"
          style="width: 100%"
          @dblclick="showPreview(item)"
          class="el-image__inner el-image__preview"
        />
        <video v-if="isVideo(item.metadata.mimetype)"
          :src="getOriginSource(item)"
          @dblclick="showPreview(item)"
          style="cursor: pointer"
          class="el-video__inner el-video__preview"
        />   
      </div>
      <div class="list-item__info">
        <div class="list-item__name">
          <span>{{ item.name }}</span>
        </div>
        <div v-if="viewIsList" class="list-item__size">{{ formatFileSize(item.metadata.size, true) }}</div>
        <div v-if="viewIsList" class="list-item__type">{{ item.metadata.mimetype }}</div>
      </div>
    </div>

    <preview-viewer :current="currentItem" @switch="switchImageHandler" :teleported="previewTeleported" v-if="showViewer">
      <div v-if="$slots.viewer">
          <slot name="viewer" />
        </div>
    </preview-viewer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, toRefs } from 'vue'
import { supabase } from '@/core/supabaseClient'
import { useFilesStore } from '@/stores/files'
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"
import { formatFileSize } from "@/utils/formatFileSize.js"
// import {
//   ArrowLeft,
//   ArrowRight,
//   Close,
//   FullScreen,
//   RefreshLeft,
//   RefreshRight,
//   ScaleToOriginal,
//   ZoomIn,
//   ZoomOut,
// } from '@element-plus/icons-vue'

import PreviewViewer from './preview/PreviewViewer.vue'

// import { useFullscreen } from '@vueuse/core'
import { isVideo, isImage } from "@/utils/is.js"


const showViewer = ref(false)
const preview = ref(null)
const publicURL = ref('')

const previewTeleported = ref(true)




const { data } = supabase.storage.from('avatars').getPublicUrl('public/')
publicURL.value = data.publicUrl

// const { toggle } = useFullscreen(preview)


const filesStore = useFilesStore()


const props = defineProps({ item: Object })
const { item } = toRefs(props)

const currentItem = ref({})



function getOriginSource(item) {
  return publicURL.value + item.name
}

function switchImageHandler(idx) {
  console.log('switchImageHandler : ', idx)
  console.log(currentItem.value)
  currentItem.value = filesStore.getFiles[idx]
}

onMounted(() => {
  currentItem.value = item
})

const showPreview = e => {
  // console.log('SHOWPREVIEW ', e, previewTeleported.value)
  // videoURL.value = publicURL.value + e.name
  // previewTeleported.value = true
  showViewer.value = true
  // previewTeleported.value = true
  document.body.style.overflow = 'hidden'
  
  // closed.value = false
  // centerDialogVisible.value = true
}
</script>

<style>
</style>