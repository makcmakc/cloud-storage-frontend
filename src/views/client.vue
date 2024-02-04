<template>
  <div>
    <Header></Header>

    <div class="wrapper">
      <div class="app">
        <Aside></Aside>

        <main class="app-content">
          <div class="app-content__inner">
              <RouterView />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/app/Header.vue'
import Aside from '@/components/app/Aside.vue'

import sortReverseVariant from '~icons/mdi/sort-reverse-variant'
import formatListBulleted from '~icons/mdi/format-list-bulleted'
import appsIcon from '~icons/mdi/apps'
import chevronDown from '~icons/mdi/chevron-down'

</script>

<style lang="scss">

</style>
