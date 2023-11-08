<template>
  <div class="client-listing">
    <div class="client-listing__container">
      <div class="container">
        <div class="list__items list--theme-tile">

          <FileCard :item="item" v-for="item in listItems" :key="item.id" />

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import sortReverseVariant from '~icons/mdi/sort-reverse-variant';
import formatListBulleted from '~icons/mdi/format-list-bulleted';
import appsIcon from '~icons/mdi/apps';

import FileCard from '@/components/FileCard.vue';

import * as Api from '@/api'
import { ref } from 'vue'

// let listItems = ref(await Api.files.getAll('photos'))
</script>