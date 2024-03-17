<template>
  <aside class="app-aside">
    <div class="app-aside__upload">
      <UploadButton v-model:path="avatar_url" @upload="updateProfile" size="10" />
    </div>

    <!-- {{  filesSize  }} -->

    <nav class="app-aside__nav">
      <RouterLink to="/files" class="app-aside__nav-link">
        <fileIcon style="font-size: 1em" />
        <span>Файлы</span>
      </RouterLink>
      <RouterLink to="/photos" class="app-aside__nav-link">
        <imageMultiple style="font-size: 1em" />
        <span>Галерея</span>
      </RouterLink>
    </nav>

    <div class="app-aside__info">
      <div class="info-space">
        <div class="info-space__header">
          <el-collapse arrow-placement="right" class="info-space__collapse" :class="{'is-empty': isEmpty}">      
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
import sharpAddchart from '~icons/ic/sharp-addchart'
import audioIcon from '~icons/gridicons/audio'
import otherIcon from '~icons/icon-park-outline/other'
import playBoxMultiple from '~icons/mdi/play-box-multiple';


import { formatFileSize } from "@/utils/formatFileSize.js"
import { isImage, isVideo, isDocument, isAudio } from "@/utils/is.js"
import { supabase } from '@/core/supabaseClient'
import { onMounted, computed, ref } from 'vue'
import { useFilesStore } from '@/stores/files'

const filesStore = useFilesStore()

const imagesSize = ref(0)
const documentsSize = ref(0)
const audioSize = ref(0)
const otherSize = ref(0)
const videosSize = ref(0)


const avatar_url = ref('')


const filesSize = ref(null)
const storageVolume = ref(1000000000)


const isEmpty = computed(() => filesSize.value === 0)



async function getBucketFilesSize() {
  const { data: files, error } = await supabase.storage.from('avatars').list();

  if (error) {
    console.error('Error fetching files:', error.message);
    return;
  }

  let totalSize = 0;

  // console.log('FILES:', files)

  files.forEach(file => {
    totalSize += file.metadata.size;
  });

  filesSize.value = totalSize

  // console.log('Total size of all files in the bucket:', totalSize, 'bytes');
}

getBucketFilesSize();


const files = ref([])

// get all files
files.value = filesStore.getFiles
// console.log(files.value)



const storageCapacity = computed(() => {
  return ((filesSize.value / storageVolume.value) * 100).toFixed(2)
})

const freeSpace = computed(() => {
  return storageVolume.value - filesSize.value
})

const sortedData = computed(() => {
  return files.value.reduce((acc, item) => {
      if (isImage(item.metadata.mimetype)) {
        acc.images += item.metadata.size
        imagesSize.value += item.metadata.size
      } else if (isVideo(item.metadata.mimetype)) {
        acc.videos += item.metadata.size
        videosSize.value += item.metadata.size
      } else if (isDocument(item.metadata.mimetype)) {
        acc.documents += item.metadata.size
        documentsSize.value += item.metadata.size
      } else if (isAudio(item.metadata.mimetype)) {
        acc.audio += item.metadata.size
        audioSize.value += item.metadata.size
      } else {
        acc.other += item.metadata.size
        otherSize.value += item.metadata.size
      }
      return acc
    }, { images: 0, videos: 0, documents: 0, audio: 0, other: 0 })
})


// const size = computed(async () => await filesStore.getFullStorageSize)


// onMounted(async () => {
//   // let data = await getBucket()
//   // const s = await data.data.map(el => el.metadata.size).reduce((a, b) => a + b, 0)
//   // filesSize.value = s
//   // sortedData()

//   // filesSize.value = await filesStore.getFullStorageSize
//   // // filesSize.value = size

// })
</script>

<style lang="scss">  
.info-space__collapse.is-empty {
  .el-collapse-item {

    &__header {
      pointer-events: none;
    }

    .el-icon.el-collapse-item__arrow,
    .el-collapse-item__wrap {
      display: none;
    }
  }
}
</style>