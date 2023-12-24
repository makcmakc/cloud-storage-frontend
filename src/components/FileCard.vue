<template>
  <div class="list-item">
    <div class="list-item__icon">
      <i class="list-item__ext" :class="color">{{ ext }}</i>
      <img v-if="isImage(ext)" :src="publicURL+item.name" class="list-item__img" :alt="item.name">
    </div>
    <div class="list-item__info">
      <div class="list-item__name">
        <span>{{ item.name }}</span>
      </div>
      <div v-if="viewIsList" class="list-item__size">{{ getFileSize(item.metadata.size, true) }}</div>
      <div v-if="viewIsList" class="list-item__type">{{ item.metadata.mimetype }}</div>
    </div>
  </div>
</template>

<script setup>
import filePdfBox from '~icons/mdi/file-pdf-box';
import filePdfOutlined from '~icons/ant-design/file-pdf-outlined';
import fileDocumentOutline from '~icons/mdi/file-document-outline';


import { computed, onMounted, ref, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { isImage } from "@/utils/isImage.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"
import { getFileSize } from "@/utils/getFileSize.js"
import { useViewStore } from '../stores/view'
import { supabase } from '@/core/supabaseClient'

const viewStore = useViewStore()

const publicURL = ref('')

const viewIsList = computed(() => {
  return viewStore.view === 'by-list'
})

const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/')
// console.log(data)
publicURL.value = data.publicUrl

const props = defineProps({ item: Object })

const { item } = toRefs(props)

const ext = getExtensionFromFileName(item.value.name);
// const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + item.value.filename : ""
const color = getColorByExtension(ext)
</script>

<style>

</style>