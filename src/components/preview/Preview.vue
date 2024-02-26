<template>
  <!-- <div> -->
    <div class="list-item" v-for="(item, idx) in photos" :key="item.id">
      <div class="list-item__icon">
        <i class="list-item__ext" :class="getColorByExtension(getExtensionFromFileName(item.name))">{{ getExtensionFromFileName(item.name) }}</i>
          <el-image v-if="isImage(item.metadata.mimetype)"
            :src="getOriginSource(item)"
            alt=""
            fit="scale-down"
            style="width: 100%"
            @dblclick="showPreview(item, idx)"
            class="el-image__inner el-image__preview"
          />
          <video v-if="isVideo(item.metadata.mimetype)"
            :src="getOriginSource(item)"
            @dblclick="showPreview(item, idx)"
            style="cursor: pointer"
            class="el-video__inner el-video__preview"
          />
      </div>
      <div class="list-item__info">
        <div class="list-item__name" :data-name="item.metadata.mimetype">
          <span>{{ item.name }}</span>
        </div>
        <div v-if="viewIsList" class="list-item__size">{{ formatFileSize(item.metadata.size, true) }}</div>
        <div v-if="viewIsList" class="list-item__type">{{ item.metadata.mimetype }}</div>
      </div>
    </div>
    
    <teleport to="body" :disabled="!teleported">
      <transition name="viewer-fade" appear>
        <div v-if="!closed" tabindex="-1" class="el-image-viewer__wrapper" style="z-index: 2005">
          <div class="el-image-viewer__mask" @click.self="hide()"></div>

          <!-- CLOSE -->
          <span class="el-image-viewer__btn el-image-viewer__close" @click="closed = true">
            <el-icon><Close /></el-icon>
          </span>

          <!-- ARROW -->
          <template v-if="!isSingle">
            <span class="el-image-viewer__btn el-image-viewer__prev" @click="prev">
              <el-icon><ArrowLeft /></el-icon>
            </span>
            <span class="el-image-viewer__btn el-image-viewer__next" @click="next">
              <el-icon><ArrowRight /></el-icon>
            </span>
          </template>
          
          <!-- ACTIONS -->
          <div class="el-image-viewer__btn el-image-viewer__actions">
            <div class="el-image-viewer__actions__inner">
              <el-icon @click="zoomOut"><ZoomOut /></el-icon>
              <el-icon @click="zoomIn"><ZoomIn /></el-icon>
              <i class="el-image-viewer__actions__divider"></i>
              <el-icon @click="fullScreen(currentItem)"><FullScreen /></el-icon>
              <i class="el-image-viewer__actions__divider"></i>
              <el-icon @click="clockwise"><RefreshLeft /></el-icon>
              <el-icon @click="anticlockwise"><RefreshRight /></el-icon>
              <i class="el-image-viewer__actions__divider"></i>
              <el-icon>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                  <path fill="currentColor" d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z">
                  </path>
                </svg>
              </el-icon>
            </div>
          </div>

          <!-- CANVAS -->
          <div class="el-image-viewer__canvas">
            <el-image v-if="isImage(currentItem.metadata.mimetype)"
              :src="getOriginSource(currentItem)"
              class="el-image-viewer__img"
              ref="preview"
              style="transform: scale(0.9) rotate(0deg) translate(0px, 0px);max-height: 100vh;max-width: 70vh;"
            />
            <video v-if="isVideo(currentItem.metadata.mimetype)"
              :src="getOriginSource(currentItem)"
              class="el-image-viewer__img"
              ref="preview"
              style="transform: scale(0.9) rotate(0deg) translate(0px, 0px);max-height: 100%;max-width: 100%;"  
              controls>
            </video>
          </div>

        </div>
      </transition>
    </teleport>
  <!-- </div> -->
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import { supabase } from '@/core/supabaseClient'
// import { useFilesStore } from '../../stores/files'
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"
import { formatFileSize } from "@/utils/formatFileSize.js"
import { isVideo, isImage } from "@/utils/is.js"

import {
  ArrowLeft,
  ArrowRight,
  Close,
  FullScreen,
  RefreshLeft,
  RefreshRight,
  ScaleToOriginal,
  ZoomIn,
  ZoomOut,
} from '@element-plus/icons-vue'

import { useFullscreen } from '@vueuse/core'


const preview = ref(null)
const publicURL = ref('')
// const currentItem = ref({})
const closed = ref(true)




const { data } = supabase.storage.from('avatars').getPublicUrl('/')
publicURL.value = data.publicUrl


const { toggle } = useFullscreen(preview)


const props = defineProps({ photos: Object })

const loading = ref(true)
const activeIndex = ref(1)

const { photos } = toRefs(props)


const currentItem = computed(() => {
  return photos.value[activeIndex.value]
})

const isSingle = computed(() => {
  return photos.value.length <= 1
})

const isFirst = computed(() => {
  return activeIndex.value === 0
})

const isLast = computed(() => {
  return activeIndex.value === photos.value.length - 1
})

function getOriginSource(item) {
  return publicURL.value + item.name
}

function setActiveItem(index) {
  const len = photos.value.length
  // console.log((index + len) % len)
  activeIndex.value = (index + len) % len
  currentItem.value = photos.value[index]

}

function prev() {
  if (isFirst.value && !true) return
  setActiveItem(activeIndex.value - 1)
}

function next() {
  if (isLast.value && !true) return
  setActiveItem(activeIndex.value + 1)
}

function zoomIn() {

}

function zoomOut() {

}

function clockwise() {

}

function anticlockwise() {

}

function fullScreen() {
  toggle()  
}

function hide() {
  closed.value = true 
}

const showPreview = (e, idx) => {
  console.log('E', e, idx)
  currentItem.value = e
  setActiveItem(idx)
  closed.value = false
}
</script>

<style>
</style>