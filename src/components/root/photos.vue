<template>
  <div class="client-listing">
    <div class="client-listing__container">

      <div class="client-listing__head">
      <div class="client-listing__heading">
        <h1 class="client-listing__heading-title">Галерея</h1>
      </div>
      </div>

      <div class="container">
        <!-- <div class="list-items" :class="viewClass">
          <FileCard v-for="item in photos" :key="item.id" :item="item" :data-id="item.id" />
        </div> -->

        <!-- {{ handleContextMenuPosition }} -->

        <div class="photo-grid">
          <div class="photo-preview"
            v-for="photo in photos"
            :key="photo.id"
            @contextmenu="handleContextMenu($event, photo)"
            @click="handleOpenFile($event, photo)"
            >
            <img v-if="!isVideo(photo.metadata.mimetype)" :src="publicURL+photo.name" class="photo-preview__img" :alt="photo.name" />

            <video v-if="isVideo(photo.metadata.mimetype)" controls="controls" autoplay :src="publicURL+photo.name"></video>
          </div>
        </div>
      </div>
    </div>
        <!-- :style="handleContextMenuPosition" -->


        <!-- <div style="background: red; padding: 30px; position: absolute;" :style="handleContextMenuPosition">
          <p>LOREM 314oinkl</p>
        </div> -->
<!-- 
  <el-popover
    ref="popover"
    title="Title"
    :width="200"
    trigger="contextmenu"
    :style="handleContextMenuPosition"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="m-2">contextmenu to activate</el-button>
    </template>
  </el-popover> -->


    <!-- <n-popover
      :show="showPopoverRef"
      placement="right"
      :x="xRef"
      :y="yRef"
      :show-arrow="false"
      width="220"
      @update:show="handleUpdateShow">

      <template #trigger></template>
      <div class="profile-popover context-menu">
          <ul class="context-menu__list">
            <li class="context-menu__item">
              <button class="context-menu__button">
                <linkBold />
                <span>Поделиться</span>
              </button>
            </li>
          </ul>          
          <ul class="context-menu__list">
            <li class="context-menu__item">
              <button class="context-menu__button">
                <photoAlbumFill />

                <span>Добавить в альбом</span>
              </button>
            </li>
            <li class="context-menu__item">
              <button class="context-menu__button">
                <starIcon />

                <span>Добавить в избранное</span>
              </button>
            </li>            
          </ul>
          <ul class="context-menu__list">
            <li class="context-menu__item">
              <button class="context-menu__button">
                <downloadIcon />

                <span>Скачать</span>
              </button>
            </li>

            <li class="context-menu__item">
              <button class="context-menu__button">
                <renameIcon />

                <span>Переименовать</span>
              </button>
            </li>
            <li class="context-menu__item">
              <button class="context-menu__button">
                <fileTransferFill />

                <span>Переместить </span>
              </button>
            </li>
          </ul>
          <ul class="context-menu__list">
            <li class="context-menu__item">
              <button class="context-menu__button">
                <baselineDelete />
                <span>Удалить</span>
              </button>
            </li>
          </ul>          
      </div>
    </n-popover> -->
  </div>
</template>

<script setup>
import sortReverseVariant from '~icons/mdi/sort-reverse-variant';
import formatListBulleted from '~icons/mdi/format-list-bulleted';
import appsIcon from '~icons/mdi/apps';

import FileCard from '@/components/FileCard.vue';

// import * as Api from '@/api'
import { computed, ref, onMounted } from 'vue'

import { supabase } from '@/core/supabaseClient'
import { useFilesStore } from '@/stores/files' 

const photos = ref([])

const publicURL = ref('')

async function getPhotos() {
  const { data } = await supabase
    .storage
    .from('avatars')
    .list('public/', {
      limit: 12
    })

    console.log(data)
  photos.value = data.filter(el => isImage(el.metadata.mimetype) )
}



async function getPhotosURL() {
  const { data } = supabase
    .storage
    .from('avatars')
    .getPublicUrl('public/')

  publicURL.value = data.publicUrl
}

const isVideo = ext => ["video/mp4"].includes(ext)
const isImage = ext => ["image/jpeg"].includes(ext)


const xRef = ref(0);
const yRef = ref(0);
const showPopoverRef = ref(true);

const handleContextMenuPosition = computed(() => {
  return `left: ${xRef.value}px; top: ${yRef.value}px;`
})

const handleContextMenu = (e, photo) => {
  e.preventDefault()
  // if (showPopoverRef.value) {
  //   showPopoverRef.value = false;
  // } else {
  //   showPopoverRef.value = true;
  //   xRef.value = e.clientX;
  //   yRef.value = e.clientY;
  // }
      xRef.value = e.clientX;
    yRef.value = e.clientY;
  console.log(xRef.value, yRef.value)
}

const handleOpenFile = (e, photo) => {
  console.log(e, photo)
}

const handleClose = (e) => {
  console.log(e)
  showPopoverRef.value = false
}


const viewStore = useFilesStore()

const viewClass = computed(() => {
  return  viewStore.view === 'by-tile' ? 'list-items--by-tile' : 'list-items--by-list'
})


onMounted(() => {
  getPhotos()
  getPhotosURL()
})

// let listItems = ref(await Api.files.getAll('photos'))
</script>

<style lang="scss">
.n-popover.n-popover-shared {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>



.photo-grid {
  user-select: none;
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: repeat(3, 5vw);
    // grid-gap: 5px;

    // grid-auto-rows: dense;
    // // grid-auto-rows: 200px;
    // grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    columns: 3 200px;
    column-gap: 5px;

    img {
      object-fit: cover;
      width: 100%;
    }
}
</style>