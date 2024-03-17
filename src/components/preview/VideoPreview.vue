<template>
  <div>
    <video
      :src="url"
      class="el-image-viewer__img"
      ref="preview"
      style="
        transform: scale(0.9) rotate(0deg) translate(0px, 0px);
        max-height: 100%;
        max-width: 100%;
      "
    ></video>
    
  </div>
</template>

<script setup>
import { toRefs } from "vue"

const props = defineProps({ url: Object })
const { url } = toRefs(props)



</script>

<style>
</style>