<template>
  <aside class="app-aside">
    <div class="app-aside__upload">
      <UploadButton />
    </div>

    <nav class="app-aside__nav">
      <RouterLink to="/files" class="app-aside__nav-link">
        <fileIcon style="font-size: 1em" />
        <span>Файлы</span>
      </RouterLink>
      <RouterLink to="/photos" class="app-aside__nav-link">
        <imageMultiple style="font-size: 1em" />
        <span>Фото</span>
      </RouterLink>
      <RouterLink to="/trash" class="app-aside__nav-link">
        <deleteOutline style="font-size: 1em" />
        <span>Корзина</span>
      </RouterLink>
    </nav>

    <div class="app-aside__info">
      <div class="info-space">
        <div class="info-space__header">
          <el-collapse arrow-placement="right" class="info-space__collapse">      
            <el-collapse-item title="Storage">
              <template #title>
                <el-icon class="info-space__header-icon">
                  <sharpAddchart /> 
                </el-icon>
                <span class="info-space__header-title">Storage</span>
              </template>  
              <div class="info-space__details">
                <div class="info-space__details-category" v-if="documentsSize">
                  <div class="category-title">
                    <fileIcon />
                    <span>Documents</span>
                  </div>
                  <div class="category-summary">
                    {{ formatFileSize(documentsSize, true) }}
                  </div>                  
                </div>
                <div class="info-space__details-category" v-if="imagesSize">
                  <div class="category-title">
                    <imageMultiple />
                    <span>Images</span>
                  </div>
                  <div class="category-summary">
                    {{ formatFileSize(imagesSize, true) }}
                  </div>                  
                </div>
                <div class="info-space__details-category" v-if="videosSize">
                  <div class="category-title">
                    <playBoxMultiple />
                    <span>Videos</span>
                  </div>
                  <div class="category-summary">
                    {{ formatFileSize(videosSize, true) }}
                  </div>                  
                </div>                
                <div class="info-space__details-category" v-if="audioSize">
                  <div class="category-title">
                    <audioIcon />
                    <span>Audio</span>
                  </div>
                  <div class="category-summary">
                    {{ formatFileSize(audioSize, true) }}
                  </div>
                </div>
                <div class="info-space__details-category" v-if="otherSize">
                  <div class="category-title">
                    <otherIcon />
                    <span>Other</span>
                  </div>
                  <div class="category-summary">
                    {{ formatFileSize(otherSize, true) }}
                  </div> 
                </div>                                        
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="indicator-bar">
          <div class="indicator-bar__value" :style="'width:' + storageCapacity + '%'"></div>
        </div>
        <div class="info-space__footer">
          <div class="info-space__text">
            Свободно {{ formatFileSize(freeSpace, true) }} из
            {{ formatFileSize(storageVolume, true) }}
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import UploadButton from './UploadButton.vue'

import fileIcon from '~icons/mdi/file'
import imageMultiple from '~icons/mdi/image-multiple'
import deleteOutline from '~icons/mdi/delete-outline'
import chevronRight from '~icons/mdi/chevron-right'
import sharpAddchart from '~icons/ic/sharp-addchart'
import audioIcon from '~icons/gridicons/audio'
import otherIcon from '~icons/icon-park-outline/other'
import playBoxMultiple from '~icons/mdi/play-box-multiple';


import { formatFileSize } from "@/utils/formatFileSize.js"
import { supabase } from '@/core/supabaseClient'
import { onMounted, computed, ref } from 'vue'

const imagesSize = ref(0)
const documentsSize = ref(0)
const audioSize = ref(0)
const otherSize = ref(0)
const videosSize = ref(0)


const filesSize = ref(null)
const storageVolume = ref(1000000000)


// const notification = useNotification()
// notification.warning({
//   content: 'What to say?',
//   meta: "I don't know",
//   duration: 2000,
//   keepAliveOnHover: true
// })


const getBucket = async () => {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .list('public/')

  return {data, error}
}

const sortedData = async () => {
  let bucket = await getBucket()

  let images = []
  let videos = []

  let sorted = await bucket.data.map(el => {
    if (el.metadata.mimetype === 'image/jpeg') images.push(el.metadata.size)
    if (el.metadata.mimetype === 'video/mp4') videos.push(el.metadata.size)

    imagesSize.value = images.reduce((a, b) => a + b, 0)
    videosSize.value = videos.reduce((a, b) => a + b, 0)
  })

  return sorted
}

const storageCapacity = computed(() => {
  return ((filesSize.value / storageVolume.value) * 100).toFixed(2)
})

const freeSpace = computed(() => {
  return storageVolume.value - filesSize.value
})

onMounted(async () => {
  let data = await getBucket()
  const s = await data.data.map(el => el.metadata.size).reduce((a, b) => a + b, 0)
  filesSize.value = s

  sortedData()
})
</script>

<style lang="scss">
.app-aside__upload .n-button,
.app-aside__upload .n-upload-trigger {
  width: 100% !important;
}
</style>