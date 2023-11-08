<template>
<div>
  <!-- <div class="list-item list-item--row">
    <div class="list-item__icon">
      <i class="list-item__ext" :class="color">{{ ext }}</i>
      <img v-if="isImage(ext)" :src="imageUrl" class="list-item__img" :alt="item.originalName">
      <filePdfOutlined v-else-if="ext === 'pdf'" />
      <fileDocumentOutline v-else />
    </div>
    <div class="list-item__name">{{ item.originalName }}</div>
    <div class="list-item__size">{{ item.size }}</div>
    <div class="list-item__type">{{ item.mimetype }}</div>
  </div> -->

  <n-data-table
    :columns="columns"
    :data="items"
    :row-key="rowKey"
    :bordered="false"
  />
  </div>
</template>

<script setup>
import filePdfBox from '~icons/mdi/file-pdf-box';
import filePdfOutlined from '~icons/ant-design/file-pdf-outlined';
import fileDocumentOutline from '~icons/mdi/file-document-outline';


import { onMounted, ref, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { isImage } from "@/utils/isImage.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"

defineProps({ items: Array })

const createColumns = () => {
  return [
    {
      type: "selection",
    },    
    {
      title: 'Name',
      key: 'filename'
    },
    {
      title: 'Original Name',
      key: 'originalName'
    },
    {
      title: 'Type',
      key: 'mimetype'
    },
    {
      title: 'Modified',
      key: 'actions'
    }
  ]
}

const columns = createColumns()
// const data = createData(items)
const data = ref([])
const rowKey = (row) => row.id


// const { items } = toRefs(props)

// const ext = getExtensionFromFileName(item.value.filename);
// const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + item.value.filename : ""
// const color = getColorByExtension(ext)

// console.log(item.value)

onMounted(() => {
  // console.log(props)
})

</script>

<style lang="scss">

</style>