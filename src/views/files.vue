<template>
  <div class="client-listing">
    <div class="client-listing__container">
      <!-- <div class="list-items" :class="viewClass">
        <FileCard v-for="item in listItems" :key="item.id" :item="item" :data-id="item.id" />
      </div> -->

      <!-- {{ files }} -->

      <!-- <img src="https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/object/sign/avatars/public/cara-delevingne-model-aktrisa-dubinka-zabor.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3B1YmxpYy9jYXJhLWRlbGV2aW5nbmUtbW9kZWwtYWt0cmlzYS1kdWJpbmthLXphYm9yLmpwZyIsImlhdCI6MTcwMTYzMjA3NCwiZXhwIjoxNzAyMjM2ODc0fQ.Od58MKCh3PmRcd2ez54TCPoJD5cQngle0D8zvFHItfA&t=2023-12-03T19%3A34%3A34.912Z" alt="">  -->

      <!-- <FileCard v-for="item in listItems" :key="item.id" :item="item" :data-id="item.id" /> -->

      <!-- <div v-for="file in files" :key="file.id"> -->
      <!-- {{ file.name.toLowerCase() }} -->
      <!-- {{ publicURL  }} -->

      <!-- {{ file.name.trim() }} -->

      <!-- <img :src="publicURL+file.name" alt=""> -->

        <!-- <img :src="'https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/object/sign/avatars/public/' + file.name + '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3B1YmxpYy9jYXJhLWRlbGV2aW5nbmUtbW9kZWwtYWt0cmlzYS1kdWJpbmthLXphYm9yLmpwZyIsImlhdCI6MTcwMTYzMjA3NCwiZXhwIjoxNzAyMjM2ODc0fQ.Od58MKCh3PmRcd2ez54TCPoJD5cQngle0D8zvFHItfA&t=2023-12-03T19%3A34%3A34.912Z'" alt=""> -->
      <!-- </div> -->

      <!-- https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/object/sign/avatars/public/2022-08-30%2017.42.50.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3B1YmxpYy8yMDIyLTA4LTMwIDE3LjQyLjUwLmpwZyIsImlhdCI6MTcwMTYzMjc0NywiZXhwIjoxNzAyMjM3NTQ3fQ.ixucvbCMntsVgR2HjsjiiQwe__IlVsRmP7I4_Sg4lfc&t=2023-12-03T19%3A45%3A47.650Z -->
<!-- 2023-12-03T16%3A56%3A11.739Z -->

      <!-- <div class="list-items">
        <div v-for="country in countries" :key="country.id">{{ country.name }}</div>
      </div> -->
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

// import * as Api from '@/api'
import { computed, ref, onMounted } from 'vue'
import { useViewStore } from '../stores/view'


import { supabase } from '@/core/supabaseClient'

const countries = ref([])
const files = ref([])
const publicURL = ref('')

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

async function getFiles() {
  const { data } = await supabase
    .storage
    .from('avatars')
    .list('public/', {
      limit: 10
    })
  files.value = data
}

// console.log(files)

const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/')
// console.log(data)
publicURL.value = data.publicUrl

// console.log(publicURL.value)



onMounted(() => {
  getCountries()

  getFiles()
})



const viewStore = useViewStore()

const viewClass = computed(() => {
  return  viewStore.view === 'by-tile' ? 'list-items--by-tile' : 'list-items--by-list'
})

let listItems = [
  // {
  //   folder: [
  //     {
  //       id: 1,
  //       filename: 'Cara Develigne',
  //       originalName: 'cara-develigne',
  //       size: 2049,
  //       mimetype: 'pdf',
  //       user: 'maxi',
  //       deletedAt: '10-10-2023'
  //     },
  //   ]
  // },
  {
    id: 1,
    filename: 'Cara Develigne',
    originalName: 'cara-develigne',
    size: 2049,
    mimetype: 'pdf',
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

const sortedItems = listItems.sort((a, b) => {
  switch (viewStore.sort) {
    case 'by-size':
      return listItems.sort((a, b) => a.size - b.size)
    case 'by-name':
      return listItems.sort((a, b) => a.name - b.name)
    case 'by-date':
      return listItems.sort((a, b) => a.date - b.date)
    case 'by-type':
      return listItems.sort((a, b) => a.type - b.type)      
    default:
      return listItems.sort((a, b) => a.name - b.name)
  }
})
</script>

<style lang="scss">
</style>
