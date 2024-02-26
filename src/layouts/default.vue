<script setup>
import NavBar from "@/components/app/NavBar.vue"
import { useScreenSize } from '@/composables/screenSize.js'

const { screenWidth } = useScreenSize()

import { useFilesStore } from '@/stores/files' 
import { onMounted } from "vue"
const filesStore = useFilesStore()

onMounted(async () => {
  await filesStore.fetchFiles()
})
</script>

<template>
  <Header></Header>

  <div class="app">
    <Aside v-if="screenWidth >= 768"></Aside>

    <NavBar v-else></NavBar>

    <main class="app-content" v-loading="filesStore.getLoading">
      <div class="app-content__inner">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
