<template>
  <div class="list-item">
    <div class="list-item__icon">
      <i class="list-item__ext" :class="color">{{ ext }}</i>
      <img :src="item.url" class="list-item__img" :alt="item.originalName">
    </div>
    <div class="list-item__info">
      <div class="list-item__name">
        <span>{{ item.originalName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { isImage } from "@/utils/isImage.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"

const props = defineProps({ item: Object })

const { item } = toRefs(props)

const ext = getExtensionFromFileName(item.value.url);
// const ext = 'jpeg'
const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + item.value.filename : ""

const color = getColorByExtension(ext)
</script>

<style>

</style>