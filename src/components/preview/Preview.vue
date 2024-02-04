<template>
  <div>
    <div class="list-item" v-for="item in photos" :key="item.id">
      <div class="list-item__icon">
        <i class="list-item__ext" :class="getColorByExtension(getExtensionFromFileName(item.name))">{{ getExtensionFromFileName(item.name) }}</i>
          <el-image v-if="isImage(item.metadata.mimetype)"
            :src="getOriginSource(item)"
            alt=""
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
        <div class="list-item__name"  :data-name="item.metadata.mimetype">
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
          <i class="el-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
              >
              </path>
            </svg>
          </i>
        </span>

        <!-- ARROW -->
        <template v-if="!isSingle">
          <span :class="arrowPrevKls" @click="prev">
            <el-icon><ArrowLeft /></el-icon>
          </span>
          <span :class="arrowNextKls" @click="next">
            <el-icon><ArrowRight /></el-icon>
          </span>
        </template>
        
        <!-- ACTIONS -->
        <div class="el-image-viewer__btn el-image-viewer__actions">
          <div class="el-image-viewer__actions__inner">
            <i class="el-icon" @click="zoomOut">
              <ZoomOut />
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64">
                </path>
              </svg> -->
            </i>
            <i class="el-icon" @click="zoomIn">
              <ZoomIn />
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z">
                </path>
              </svg> -->
            </i>
            <i class="el-image-viewer__actions__divider"></i>
            <i class="el-icon" @click="fullScreen(currentItem)">
              <FullScreen />
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z">
                </path>
              </svg> -->
            </i>
            <i class="el-image-viewer__actions__divider"></i>
            <i class="el-icon" @click="clockwise">
              <RefreshLeft />
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z">
                </path>
              </svg> -->
            </i>
            <i class="el-icon" @click="anticlockwise">
              <RefreshRight />
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path
                  fill="currentColor"
                  d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z">
                </path>
              </svg> -->
            </i>
            <i class="el-icon">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                <path fill="currentColor" d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z">
                </path>
              </svg>
            </i>
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
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import { supabase } from '@/core/supabaseClient'
import { useFilesStore } from '../../stores/files'
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"
import { formatFileSize } from "@/utils/formatFileSize.js"
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
const { toggle } = useFullscreen(preview)

const publicURL = ref('')

const videoURL = ref('')

const currentItem = ref()

const closed = ref(true)

const arrowPrevKls = "el-image-viewer__btn el-image-viewer__prev"
const arrowNextKls = "el-image-viewer__btn el-image-viewer__next"



// const ext = getExtensionFromFileName();
// const color = getColorByExtension(ext)


const isVideo = ext => ["video/mp4"].includes(ext)
const isImage = ext => ["image/jpeg", "image/png"].includes(ext)


const { data } = supabase.storage.from('avatars').getPublicUrl('public/')
publicURL.value = data.publicUrl


const props = defineProps({ photos: Object })

const loading = ref(true)
const activeIndex = ref(1)
const transform = ref({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false,
})


const { photos } = toRefs(props)

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
  currentItem.value = photos.value[index]
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

function fullScreen(item) {
  // console.log(item)
  toggle()
}

function hide() {
  console.log('HIDE')
  closed.value = true 
}


const showPreview = e => {
  console.log('SHOWPREVIEW ', e)
  // videoURL.value = publicURL.value + e.name
  currentItem.value = e
  closed.value = false
  // centerDialogVisible.value = true
}
</script>

<style>
</style>