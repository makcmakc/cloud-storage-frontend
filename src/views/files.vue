<template>
  <div class="client-listing">
    <div class="client-listing__container">
      <!-- <div class="list__items list--theme-tile">
        <FileCard v-for="item in listItems" :key="item.id" :item="item" :data-id="item.id"  @contextmenu.prevent.stop="handleContextMenu($event, item)" />
      </div> -->
      <div class="list__items list--theme-list">
        <!-- <FileList v-for="item in listItems" :key="item.id" :item="item" :data-id="item.id" /> -->
        <FileCard v-for="item in listItems" :key="item.id" :item="item" :data-id="item.id" />
      </div>
    </div>


    <div class="context-menu" ref="contextMenu" v-if="contextMenuVisibile" :style="{'top': y, 'left': x}">
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
    
  </div>
</template>



<script >
export default {
  data() {
    return {
      contextMenuVisibile: false,
      x: 0,
      y: 0
    }
  },
  methods: {
     handleContextMenu (event, item) {
      //  this.contextMenuVisibile = !this.contextMenuVisibile
      this.contextMenuVisibile = true
      this.y = event.clientY + 10 + 'px'
      this.x = event.clientX + 10 + 'px'

      document.body.addEventListener('click', (e) => {
        console.log('REF s', this.$refs.contextMenu, e.target.offsetParent)

        if (e.target.offsetParent !== this.$refs.contextMenu) {
          this.contextMenuVisibile = true
        }
        this.contextMenuVisibile = false
      })
    },
    handleDelete(e) {
      console.log(e)
    }
  }
}

</script>

<script setup>
import FileCard from '@/components/FileCard.vue'


import baselineDelete from '~icons/ic/baseline-delete';
import downloadIcon from '~icons/material-symbols/download';
import renameIcon from '~icons/mdi/rename';
import photoAlbumFill from '~icons/mingcute/photo-album-fill';
import fileTransfer from '~icons/mdi/file-transfer';
import fileTransferFill from '~icons/ri/file-transfer-fill';
import shareIcon from '~icons/material-symbols/share';
import linkBold from '~icons/solar/link-bold';
import starIcon from '~icons/material-symbols/star';

import * as Api from '@/api'
import { ref } from 'vue'

// let listItems = ref(await Api.files.getAll())

let listItems = [
  {
    id: 1,
    filename: 'Cara Develigne',
    originalName: 'cara-develigne',
    size: 2049,
    mimetype: 'jpeg',
    user: 'maxi',
    deletedAt: '10-10-2023'
  },
  {
    id: 2,
    filename: 'Cara Develigne',
    originalName: 'cara-develigne',
    size: 2049,
    mimetype: 'jpeg',
    user: 'maxi',
    deletedAt: '10-10-2023'
  },
  {
    id: 3,
    filename: 'Cara Develigne',
    originalName: 'cara-develigne',
    size: 2049,
    mimetype: 'jpeg',
    user: 'maxi',
    deletedAt: '10-10-2023'
  }  
]
</script>




<style lang="scss">
</style>
