<template>
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
            <!-- {{  activeIndex  }} -->
            <el-image v-if="isImage(currentItem.metadata.mimetype)"
              :src="getOriginSource(currentItem)"
              class="el-image-viewer__img"
              ref="preview"
              style="transform: scale(0.9) rotate(0deg) translate(0px, 0px);max-height: 100vh;max-width: 70vh;"
            />
            <video v-if="isVideo(currentItem.metadata.mimetype)"
              :src="getOriginSource(currentItem)"
              class="el-video-viewer__video"
              ref="preview"
              style="transform: scale(0.9) rotate(0deg) translate(0px, 0px);max-height: 100%;max-width: 100%;"  
              controls>
            </video>
          </div>

        </div>
      </transition>
    </teleport>
</template>

<script setup>
import { isVideo, isImage } from "@/utils/is.js"
import { computed, ref, toRefs, watch } from "vue"
import { useFilesStore } from '@/stores/files'
import { supabase } from '@/core/supabaseClient'

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

const publicURL = ref('')

const closed = ref(false)
const activeIndex = ref(1)
const filesStore = useFilesStore()
const photos = ref([])


const emit = defineEmits(['switch'])


photos.value = filesStore.getFiles

const { data } = supabase.storage.from('avatars').getPublicUrl('public/')
publicURL.value = data.publicUrl


const props = defineProps({ current: Object })
const { current } = toRefs(props)

const currentItem = ref(current)

// currentItem.value = current

// console.log('teleported : ', photos.value)


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
  // currentItem.value = photos.value[index]
  activeIndex.value = (index + len) % len
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

watch(activeIndex, (val) => {
  // reset()
  // console.log(activeIndex, val)
  // setActiveItem(val)
  currentItem.value = photos.value[val]
  emit('switch', val)
})

</script>

<style>

</style>