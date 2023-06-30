<template>
  <div class="list-item">
    <!-- {{ item.originalName }} {{ item.id }} -->
    <div class="list-item__icon">
      <i class="list-item__ext" :class="color">{{ ext }}</i>
      <img :src="imageUrl" class="list-item__img" :alt="item.originalName">
    </div>
    <div class="list-item__info">
      <div class="list-item__name">
        <span>{{ item.originalName }}</span>
      </div>
    </div>
  </div>
      {{ humanFileSize(item.size) }}
</template>

<script setup>
import { defineProps, toRefs } from "vue"
import { getExtensionFromFileName } from "@/utils/getExtensionFromFileName.js"
import { isImage } from "@/utils/isImage.js"
import { getColorByExtension } from "@/utils/getColorByExtension.js"

const props = defineProps({ item: Object })

const { item } = toRefs(props)

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}


const ext = getExtensionFromFileName(item.value.filename);
// const ext = 'jpeg'
const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + item.value.filename : ""

const color = getColorByExtension(ext)
</script>

<style>

</style>