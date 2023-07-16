<template>
  <div class="list-item list-item--row">
    <div class="list-item__icon">
      <i class="list-item__ext" :class="color">{{ ext }}</i>
      <img v-if="isImage(ext)" :src="imageUrl" class="list-item__img" :alt="item.originalName">
      <filePdfOutlined v-else-if="ext === 'pdf'" />
      <fileDocumentOutline v-else />
    </div>
    <div class="list-item__name">{{ item.originalName }}</div>
    <div class="list-item__size">{{ item.size }}</div>
    <div class="list-item__type">{{ item.mimetype }}</div>
  </div>
</template>

<script setup>
import filePdfBox from '~icons/mdi/file-pdf-box';
import filePdfOutlined from '~icons/ant-design/file-pdf-outlined';
import fileDocumentOutline from '~icons/mdi/file-document-outline';


import { defineProps, onMounted, ref, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { isImage } from "@/utils/isImage.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"

const props = defineProps({ item: Object })

const { item } = toRefs(props)

const ext = getExtensionFromFileName(item.value.filename);
const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + item.value.filename : ""
const color = getColorByExtension(ext)

console.log(item.value)

onMounted(() => {
  console.log(localStorage.getItem('VcloudView'))
})

</script>

<style lang="scss">
.list-item--row {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  height: 50px;

  .list-item__icon {
    width: 40px;
    height: 40px;
    align-items: center;

    img {
      max-width: 40px;
      max-height: 40px;
    }
  }

  .list-item__ext {
    display: none;
  }

  .list-item__size {
    flex-basis: 120px;
    text-align: right;
    display: inline-flex;
    justify-content: flex-end;
  }

  .list-item__type {
    flex-basis: 160px;
    text-align: right;
    display: inline-flex;
    justify-content: flex-end;
  }

  .list-item__name {
    width: 100%;
    height: auto;
    text-align: left;
    margin-left: 15px;
  }
}
</style>