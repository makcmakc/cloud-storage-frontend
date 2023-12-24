<template>
  <div class="client-listing">
    <div class="client-listing__container">
      <div class="container">
        <div class="list-items" :class="viewClass">

          <FileCard v-for="item in photos" :key="item.id" :item="item" :data-id="item.id" />

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

// import * as Api from '@/api'
import { computed, ref, onMounted } from 'vue'

import { supabase } from '@/core/supabaseClient'
import { useViewStore } from '../stores/view';

const photos = ref([])

async function getPhotos() {
  const { data } = await supabase
    .storage
    .from('avatars')
    .list('public/', {
      limit: 10
    })
  photos.value = data
}

const viewStore = useViewStore()

const viewClass = computed(() => {
  return  viewStore.view === 'by-tile' ? 'list-items--by-tile' : 'list-items--by-list'
})


onMounted(() => {
  getPhotos()
})

// let listItems = ref(await Api.files.getAll('photos'))
</script>