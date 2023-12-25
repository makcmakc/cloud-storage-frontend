<template>
  <div class="client-listing" @dragover="hanleDragover" @dragleave="handleDragleave" @drop="handleDrop">
    <div class="client-listing__head">
      <div class="client-listing__heading">
        <h1 class="client-listing__heading-title">Файлы</h1>
      </div>

      <div class="client-listing__settings">
        <span class="settings-by-sort">
          <n-dropdown trigger="click" :options="sortSettings" @select="handleSortSelect">
            <n-button icon-placement="right">
              <template #icon>
                <n-icon>
                  <chevronDown />
                </n-icon>
              </template>
              <sortReverseVariant style="font-size: 1.3em" />
            </n-button>
          </n-dropdown>                  
        </span>

        <span class="settings-by-type">
          <n-dropdown trigger="click" :options="viewSettings" @select="handleViewSelect">
            <n-button icon-placement="right">
              <template #icon>
                <n-icon>
                  <chevronDown />
                </n-icon>
              </template>
              <formatListBulleted style="font-size: 1.3em; display: none" />
              <appsIcon style="font-size: 1.3em" />
            </n-button>
          </n-dropdown>
        </span>
      </div>
    </div>

    <div class="client-listing__container">
      <div class="list-items" :class="viewClass">
        <FileCard v-for="file in files" :key="file.id" :item="file" :data-id="file.id" />
      </div>
    </div>

    <vue-selecto
      :selectableTargets="['.list-item']"
      :dragContainer="dragContainer"
      :hitRate="40"
      :selectFromInside="false"
      :selectByClick="true"
      :toggleContinueSelect="'shift'"
      @dragStart="onDragStart"
      @keydown="onKeydown"
      @keyup="onKeyup"
      @selectStart="onSelectStart"
      @selectEnd="onSelectEnd"
      @select="onSelect"
    />    
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



import sortReverseVariant from '~icons/mdi/sort-reverse-variant'
import formatListBulleted from '~icons/mdi/format-list-bulleted'
import appsIcon from '~icons/mdi/apps'
import chevronDown from '~icons/mdi/chevron-down'

// import * as Api from '@/api'
import { computed, ref, onMounted } from 'vue'
import { useViewStore } from '../../stores/view' 

import { VueSelecto } from 'vue3-selecto'


import { supabase } from '@/core/supabaseClient'


const countries = ref([])
const files = ref([])
const publicURL = ref('')

const isVideo = ext => ["video/mp4"].includes(ext)
const isImage = ext => ["image/jpeg"].includes(ext)

const filesView = ref('tile')
const sortSettings = [
  {
    label: 'Сортировка',
    key: 'Marina Bay Sands',
    disabled: true
  },
  {
    label: "По названию",
    key: "by-name"
  },
  {
    label: 'По размеру',
    key: 'by-size'
  },
  {
    label: 'По типу',
    key: 'by-type'
  },
  {
    label: 'По Дате изменения',
    key: 'by-date'
  },                
]
const viewSettings = [
  {
    label: 'Вид',
    key: 'view',
    disabled: true
  },
  {
    label: "Плитка",
    key: "by-tile"
  },
  {
    label: 'Список',
    key: 'by-list'
  },
]




async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

async function getFiles() {
  const { data } = await supabase
    .storage
    .from('avatars')
    .list('public/', {
      limit: 12
    })
  files.value = data
}


const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/')
// console.log(data)
publicURL.value = data.publicUrl

// console.log(publicURL.value)

const handleSortSelect = (e) => {
  const viewStore = useViewStore()
  viewStore.sort = e
  console.log('Select by sort : ', e, viewStore.sort)
}

const handleViewSelect = (e) => {
  const viewStore = useViewStore()
  viewStore.view = e
  console.log('Select by view : ', e, viewStore.view)
}

const handleView = () => {
  this.filesView = 'list'
  localStorage.setItem('VcloudView', 'list')
}


    const onSelectStart = (e) => {
      e.added.forEach(el => el.classList.add('selected'))
      e.removed.forEach(el => el.classList.remove('selected'))
    }
    const onSelectEnd = (e) => {
      e.afterAdded.forEach(el => el.classList.add('selected'))
      e.afterRemoved.forEach(el => el.classList.remove('selected'))
    }


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
