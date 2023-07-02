<template>
  <div class="list-item">
    <div class="list-item__icon">
      <i class="list-item__ext" :class="color">{{ ext }}</i>
      <!-- <img v-if="isImage(ext)" :src="imageUrl" class="list-item__img" :alt="item.originalName">
      <filePdfOutlined v-else-if="ext === 'pdf'" />
      <fileDocumentOutline v-else /> -->
    </div>
    <div class="list-item__info">
      <div class="list-item__name">
        <span>{{ item.originalName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import filePdfBox from '~icons/mdi/file-pdf-box';
import filePdfOutlined from '~icons/ant-design/file-pdf-outlined';
import fileDocumentOutline from '~icons/mdi/file-document-outline';


import { defineProps, ref, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { isImage } from "@/utils/isImage.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"

const props = defineProps({ item: Object })

const { item } = toRefs(props)

const ext = getExtensionFromFileName(item.value.filename);
const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + item.value.filename : ""
const color = getColorByExtension(ext)

</script>

<style>

</style>