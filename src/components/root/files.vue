<template>
  <div class="client-listing" @dragover="hanleDragover" @dragleave="handleDragleave" @drop="handleDrop">
    <div class="client-listing__head">
      <div class="client-listing__heading">
        <h1 class="client-listing__heading-title">Файлы</h1>
      </div>

      <div class="client-listing__settings">
        <span class="settings-by-sort">
          <el-dropdown @command="handleViewSelect" trigger="click">
            <span class="el-dropdown-link">
              <formatListBulleted />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(view, i) in viewSettings" :class="{'is-title': view.isTitle}" :key="i" :command="view.key">{{ view.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>                          
        </span>
        <span class="settings-by-type">
          <el-dropdown @command="handleSortSelect" trigger="click">
            <span class="el-dropdown-link">
              <sortReverseVariant />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(sort, i) in sortSettings" :class="{'is-title': sort.isTitle}" :key="i" :command="sort.key">{{ sort.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>                          
        </span>
      </div>
    </div>

    <div class="client-listing__container">
      <div class="list-items" :class="viewClass">
      <!-- <div class="folders">
        <FolderCard v-for="bucket in buckets" :key="bucket.id" :folder="bucket" :data-id="bucket.id" />
      </div> -->
        
        <FileCard v-for="(file, idx) in files" :key="file.id" :idx="idx" :item="file" :data-id="file.id" />
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

<script setup>
import FileCard from '@/components/FileCard.vue'
import FolderCard from '@/components/FolderCard.vue'

import baselineDelete from '~icons/ic/baseline-delete';
import downloadIcon from '~icons/material-symbols/download';
import renameIcon from '~icons/mdi/rename';
import photoAlbumFill from '~icons/mingcute/photo-album-fill';
import fileTransfer from '~icons/mdi/file-transfer';
import fileTransferFill from '~icons/ri/file-transfer-fill';
import shareIcon from '~icons/material-symbols/share';
import linkBold from '~icons/solar/link-bold';
import starIcon from '~icons/material-symbols/star';


import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'

import sortReverseVariant from '~icons/mdi/sort-reverse-variant'
import formatListBulleted from '~icons/mdi/format-list-bulleted'
import appsIcon from '~icons/mdi/apps'
import chevronDown from '~icons/mdi/chevron-down'

import { computed, ref, onMounted } from 'vue'
import { useViewStore } from '../../stores/view' 
import { useFilesStore } from '../../stores/files' 

import { VueSelecto } from 'vue3-selecto'


import { supabase } from '@/core/supabaseClient'


const filesStore = useFilesStore()


const buckets = ref([])
const files = ref([])
const viewSettings = filesStore.viewSettings
const sortSettings = filesStore.sortSettings


const isVideo = ext => ["video/mp4"].includes(ext)
const isImage = ext => ["image/jpeg"].includes(ext)

const handleSortSelect = (v) => filesStore.updateSort(v)

const handleViewSelect = (v) => filesStore.updateView(v)


const onSelectStart = (e) => {
  e.added.forEach(el => el.classList.add('selected'))
  e.removed.forEach(el => el.classList.remove('selected'))
}
const onSelectEnd = (e) => {
  e.afterAdded.forEach(el => el.classList.add('selected'))
  e.afterRemoved.forEach(el => el.classList.remove('selected'))
}


const viewClass = computed(() => {
  return filesStore.view === 'by-tile' ? 'list-items--by-tile' : 'list-items--by-list'
})

onMounted(async () => {
  // files.value = 
  await filesStore.fetchFiles()
  await filesStore.fetchBuckets()
  files.value = filesStore.getFiles
  buckets.value = filesStore.getBuckets
})
</script>

<style lang="scss">
.folders {
  display: flex;
  gap: 12px;
}

.el-dropdown-menu__item.is-title {
  // border-bottom: 1px solid #EBEEF5;
  font-size: 13px;
  padding: 4px 16px;
  color: #909399;
  pointer-events: none;

}
</style>
