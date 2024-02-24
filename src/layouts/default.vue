<script setup>
import NavBar from "@/components/app/NavBar.vue"
import { useScreenSize } from '@/composables/screenSize.js'

const { screenWidth } = useScreenSize()
</script>

<template>
  <Header></Header>

  <!-- <div class="wrapper"> -->
    <div class="app">
      <Aside v-if="screenWidth >= 768"></Aside>

      <NavBar v-else></NavBar>

      <!-- <p>Window Width: {{ screenWidth }}</p> -->

      <main class="app-content">
        <div class="app-content__inner">
          <slot></slot>
        </div>
      </main>

    <!-- </div> -->
  </div>
</template>

<style lang="scss">

</style>
