<template>
  <!-- <div> -->
    <div class="list-item" v-for="(item, idx) in photos" :key="item.id">
      <div class="list-item__icon">
        <i class="list-item__ext" :class="getColorByExtension(getExtensionFromFileName(item.name))">{{ getExtensionFromFileName(item.name) }}</i>
          <el-image v-if="isImage(item.metadata.mimetype)"
            :src="getOriginSource(item)"
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
          <div v-if="isPDF(item.metadata.mimetype)">
            <img src="@/assets/pdf-logo.png" alt="">
          </div>
          <div v-if="isDOC(item.metadata.mimetype)">
            <img src="@/assets/docs-logo.png" alt="">
          </div>
          <div v-if="isAudio(item.metadata.mimetype)">
            <img src="@/assets/equalizer.png" alt="" @dblclick="showPreview(item, idx)" />
          </div>
          
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
          <div class="el-image-viewer__btn el-image-viewer__actions" v-if="isImage(currentItem.metadata.mimetype)">
            <div class="el-image-viewer__actions__inner">
              <el-icon @click="zoomOut"><ZoomOut /></el-icon>
              <el-icon @click="zoomIn"><ZoomIn /></el-icon>
              <!-- <i class="el-image-viewer__actions__divider"></i> -->
              <el-icon @click="fullScreen(currentItem)"><FullScreen /></el-icon>
              <!-- <i class="el-image-viewer__actions__divider"></i> -->
              <!-- <el-icon @click="clockwise"><RefreshLeft /></el-icon>
              <el-icon @click="anticlockwise"><RefreshRight /></el-icon>
              <i class="el-image-viewer__actions__divider"></i> -->
              <el-icon>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                  <path fill="currentColor" d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z">
                  </path>
                </svg>
              </el-icon>
            </div>
          </div>

          <div class="el-video-viewer__btn el-video-viewer__actions" v-if="isVideo(currentItem.metadata.mimetype)">
            <div  class="el-image-viewer__actions__inner">
              <div class="el-audio__play" @click="playHandler">
                <el-icon v-if="!isPlaying"><VideoPlay /></el-icon>
                <el-icon v-else><VideoPause /></el-icon>
              </div>

              <div class="el-audio__duration">
                <el-slider v-model="duration" />
              </div>

              <div class="el-audio__time-range">
                <!-- <span class="time">0:00</span> / 
                <span class="time">0:00</span> -->
                {{  currentTime  }}
              </div>

              <div class="el-audio__volume">
                <el-slider v-model="value1" />
              </div>

              <div class="el-audio__repeat">
                <el-icon><Refresh /></el-icon>
              </div>  

              <div class="el-audio__download">
                <el-icon>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                    <path fill="currentColor" d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z">
                    </path>
                  </svg>
                </el-icon>
              </div>
            </div>
          </div>          

          <div class="el-audio-viewer__btn el-audio-viewer__actions" v-if="isAudio(currentItem.metadata.mimetype)">
            <div  class="el-image-viewer__actions__inner">
              <div class="el-audio__play">
                <el-icon><VideoPlay /></el-icon>
              </div>

              <div class="el-audio__duration">
                <el-slider v-model="value1" />
              </div>

              <div class="el-audio__time-range">
                <span class="time">0:00</span> / 
                <span class="time">0:00</span>
              </div>

              <div class="el-audio__volume">
                <el-slider v-model="value1" />
              </div>

              <div class="el-audio__repeat">
                <el-icon><Refresh /></el-icon>
              </div>  

              <div class="el-audio__download">
                <el-icon>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                    <path fill="currentColor" d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z">
                    </path>
                  </svg>
                </el-icon>
              </div>
            </div>
          </div>

          <!-- CANVAS -->
          <div class="el-image-viewer__canvas" v-if="isImage(currentItem.metadata.mimetype)">
            <el-image class="el-image-viewer__img"
              :src="getOriginSource(currentItem)"
              ref="preview"
              style="transform: scale(0.9) rotate(0deg) translate(0px, 0px); max-height: 100vh; max-width: 70vh;"
            />
          </div>

          <div class="el-video-viewer__canvas" v-if="isVideo(currentItem.metadata.mimetype)">
            <video
              :src="getOriginSource(currentItem)"
              @loadedmetadata="(event) => handleLoadedMetaData(event)"
              @play="(event) => console.log('play', event)"
              @pause="(event) => console.log('pause', event)"
              @timeupdate="(event) => metadataHandler(event)"
              @volumechange="(event) => console.log('volumechange', event)"
              @error="(event) => console.log('error', event)"
              class="el-video-viewer__video"
              ref="videoPreview"
              style="
                transform: scale(0.9) rotate(0deg) translate(0px, 0px);
                max-height: 100%;
                max-width: 100%;
              "
            ></video>
            <!-- <VideoPreview 
              :url="getOriginSource(currentItem)"
              class="videoplayer"
              :muted="false"
              :autoplay="false"
              :loop="false"
              poster="https://demo-res.cloudinary.com/video/upload/q_auto,f_auto,w_500/dog.jpg"
              @play="onPlayerPlay"
              @pause="onPlayerPause"
              @ended="onPlayerEnded"
              @loadeddata="onPlayerLoadeddata"
              @waiting="onPlayerWaiting"
              @playing="onPlayerPlaying"
              @timeupdate="onPlayerTimeupdate"
              @canplay="onPlayerCanplay"
              @canplaythrough="onPlayerCanplaythrough"
              @statechanged="playerStateChanged"
            /> -->
                        <!-- <video v-if="isVideo(currentItem.metadata.mimetype)"
              :src="getOriginSource(currentItem)"
              class="el-image-viewer__img"
              ref="preview"
              style="transform: scale(0.9) rotate(0deg) translate(0px, 0px);max-height: 100%;max-width: 100%;"  
              controls>
            </video> -->
          </div>

          <div class="el-audio-viewer__canvas" v-if="isAudio(currentItem.metadata.mimetype)">
            <div class="el-audio-viewer__visual">
              <h1>HERE WILL BE AUDIO</h1>
            </div>
          </div>

          <div class="el-document-viewer__canvas" v-if="isDocument(currentItem.metadata.mimetype)">
            <div class="el-document-viewer__document"></div>
            <h1>HERE WILL BE DOCUMENT VIEWER</h1>
          </div>

        </div>
      </transition>
    </teleport>
  <!-- </div> -->
</template>

<script setup>
import { computed, effectScope, onMounted, ref, toRefs } from 'vue'
import { supabase } from '@/core/supabaseClient'
// import { useFilesStore } from '../../stores/files'
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"
import { formatFileSize } from "@/utils/formatFileSize.js"
import { isVideo, isImage, isDocument, isPDF, isDOC, isAudio } from "@/utils/is.js"

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

  Refresh,
  VideoPlay,
  VideoPause
} from '@element-plus/icons-vue'


const value1 = ref()


const time = ref(0)

const isPlaying = ref(false)
const videoPreview = ref(null)

const duration = ref(0)
const currentTime = ref("00:00")


// emits
const emit = defineEmits([
  'loadedmetadata',
  'play',
  'pause',
  'timeupdate',
  'volumechange',
  'error',
]);

const video = ref(null);

const handleLoadedMetaData = (event) => {
  const meta = Object.assign({}, {
    video: {
      // ...data.video,
      element: event.target,
      // canvas: canvas.value,
      width: event.target.videoWidth,
      height: event.target.videoHeight,
      duration: event.target.duration,
      // paused: !(props.muted === true && props.autoplay === true),
    }
  });

  // initialVideo();
  console.log("initialVideo", event, meta)
};

const playHandler = () => {
  const audio = videoPreview.value
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play()
  }

  isPlaying.value = !isPlaying.value
}

function formatTime(seconds) {
  let minutes

  minutes = Math.floor(seconds / 60)
  minutes = (minutes >= 10) ? minutes : "0" + minutes
  seconds = Math.floor(seconds % 60)
  seconds = (seconds >= 10) ? seconds : "0" + seconds
  return minutes + ":" + seconds
}

const metadataHandler = (e) => {
  const t  =  Math.floor(e.target.currentTime)
  const dur  =  e.target.duration

  duration.value = t / dur * 100
  currentTime.value = formatTime(t)
}


import { useFullscreen } from '@vueuse/core'
import AudioPreview from './AudioPreview.vue'
import { EVENT_CODE } from '@/core/constants'
// import { throttle } from 'lodash-unified'

import { useEventListener } from '@vueuse/core'

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
  isPlaying.value = null
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

const scopeEventListener = effectScope()

function registerEventListener() {
  const keydownHandler = (e) => {
    switch (e.code) {
      // ESC
      case EVENT_CODE.esc:
        props.closeOnPressEscape && hide()
        break
      // SPACE
      case EVENT_CODE.space:
        toggleMode()
        break
      // LEFT_ARROW
      case EVENT_CODE.left:
        prev()
        break
      // UP_ARROW
      case EVENT_CODE.up:
        handleActions('zoomIn')
        break
      // RIGHT_ARROW
      case EVENT_CODE.right:
        next()
        break
      // DOWN_ARROW
      case EVENT_CODE.down:
        handleActions('zoomOut')
        break
    }
  }
  // const mousewheelHandler = throttle((e) => {
  //   const delta = e.deltaY || e.deltaX
  //   handleActions(delta < 0 ? 'zoomIn' : 'zoomOut', {
  //     zoomRate: props.zoomRate,
  //     enableTransition: false,
  //   })
  // })

  scopeEventListener.run(() => {
    useEventListener(document, 'keydown', keydownHandler)
    // useEventListener(document, 'wheel', mousewheelHandler)
  })
}


function handleActions(action, options = {}) {
  if (loading.value) return
  const { minScale, maxScale } = props
  const { zoomRate, rotateDeg, enableTransition } = {
    zoomRate: props.zoomRate,
    rotateDeg: 90,
    enableTransition: true,
    ...options,
  }
  switch (action) {
    case 'zoomOut':
      if (transform.value.scale > minScale) {
        transform.value.scale = Number.parseFloat(
          (transform.value.scale / zoomRate).toFixed(3)
        )
      }
      break
    case 'zoomIn':
      if (transform.value.scale < maxScale) {
        transform.value.scale = Number.parseFloat(
          (transform.value.scale * zoomRate).toFixed(3)
        )
      }
      break
    case 'clockwise':
      transform.value.deg += rotateDeg
      emit('rotate', transform.value.deg)
      break
    case 'anticlockwise':
      transform.value.deg -= rotateDeg
      emit('rotate', transform.value.deg)
      break
  }
  transform.value.enableTransition = enableTransition
}

// watch(currentImg, () => {
//   nextTick(() => {
//     const $img = imgRefs.value[0]
//     if (!$img?.complete) {
//       loading.value = true
//     }
//   })
// })

// watch(activeIndex, (val) => {
//   // reset()
//   // emit('switch', val)
// })

onMounted(() => {
  registerEventListener()
  // add tabindex then wrapper can be focusable via Javascript
  // focus wrapper so arrow key can't cause inner scroll behavior underneath
  // wrapper.value?.focus?.()
})


function unregisterEventListener() {
  scopeEventListener.stop()
}

function handleImgLoad() {
  loading.value = false
}

function handleImgError(e) {
  loading.value = false
  e.target.alt = t('el.image.error')
}

function handleMouseDown(e) {
  if (loading.value || e.button !== 0 || !wrapper.value) return
  transform.value.enableTransition = false

  const { offsetX, offsetY } = transform.value
  const startX = e.pageX
  const startY = e.pageY

  const dragHandler = throttle((ev) => {
    transform.value = {
      ...transform.value,
      offsetX: offsetX + ev.pageX - startX,
      offsetY: offsetY + ev.pageY - startY,
    }
  })
  const removeMousemove = useEventListener(document, 'mousemove', dragHandler)
  useEventListener(document, 'mouseup', () => {
    removeMousemove()
  })

  e.preventDefault()
}

function reset() {
  transform.value = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  }
}

function toggleMode() {
  if (loading.value) return

  const modeNames = keysOf(modes)
  const modeValues = Object.values(modes)
  const currentMode = mode.value.name
  const index = modeValues.findIndex((i) => i.name === currentMode)
  const nextIndex = (index + 1) % modeNames.length
  mode.value = modes[modeNames[nextIndex]]
  reset()
}

const showPreview = (e, idx) => {
  console.log('E', e, idx)
  currentItem.value = e
  setActiveItem(idx)
  closed.value = false
}
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>