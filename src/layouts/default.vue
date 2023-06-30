<template>
  <Header />

  <div class="wrapper">

    <div class="app">

      <Aside />

      <main class="app-content">
        <div class="app-content__inner">

          <div class="client-listing__head" :class="{'client-listing__head--trash': this.$route.meta.title === 'Корзина'}">
            <div class="client-listing__heading">
              <h1 class="client-listing__heading-title">{{ this.$route.meta.title }}</h1>
            </div>
            <div class="client-listing__settings" v-if="this.$route.meta.title !== 'Корзина'">
              <span class="settings-by-sort" >
                <button class="btn btn--icon">
                  <sortReverseVariant style="font-size: 1.3em;" />
                  <div class="btn__arrow">
                    <chevronDown />
                  </div>
                </button>
              </span>

              <span class="settings-by-type">
                <button class="btn btn--icon">
                  <formatListBulleted style="font-size: 1.3em; display: none;" />
                  <appsIcon style="font-size: 1.3em;" />
                  <div class="btn__arrow">
                    <chevronDown />
                  </div>
                </button>
              </span>

            </div>
          </div>

          <Suspense>
              <RouterView />
              <template #fallback>
                Loading...
              </template>
          </Suspense>
        </div>

        <vue-selecto
          :selectableTargets="['.list-item']"
          :dragContainer="dragContainer"
          :hitRate="40"
          :selectFromInside="false"
          :selectByClick="true"
          :toggleContinueSelect="'shift'"
          @dragStart="onDragStart"
          @keydown="onKeydown"
          @keyup="onKeyup"
          @selectStart="onSelectStart"
          @selectEnd="onSelectEnd"
          @select="onSelect"
        />
      </main>
    </div>
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import sortReverseVariant from '~icons/mdi/sort-reverse-variant';
import formatListBulleted from '~icons/mdi/format-list-bulleted';
import appsIcon from '~icons/mdi/apps';
import chevronDown from '~icons/mdi/chevron-down';
import Aside from '@/components/Aside.vue'

import { ref } from 'vue';

</script>

<script>
import { VueSelecto } from 'vue3-selecto'

export default {
  name: 'default',
  components: {
    VueSelecto
  },
  data() {
    return {
      dragContainer: document.querySelector('.container'),
    }
  },
  methods: {
    onSelectStart(e) {
      e.added.forEach(el => el.classList.add('selected'))
      e.removed.forEach(el => el.classList.remove('selected'))
    },
    onSelectEnd(e) {
      e.afterAdded.forEach(el => el.classList.add('selected'))
      e.afterRemoved.forEach(el => el.classList.remove('selected'))
    },
    onSelect(e) {
      e.added.forEach(el => el.classList.add('active'))
      e.removed.forEach(el => el.classList.remove('active'))
    },
    // onKeydown() {
    //   document.querySelector('.button').classList.add('selected')
    // },
    // onKeyup() {
    //   document.querySelector('.button').classList.remove('selected')
    // }
  }
}
</script>




<style scoped lang="scss">
.btn {
  color: #000;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;

  &--icon {
    width: 62px;
    height: 42px;
    border: 1px solid #dcdfe6;
    padding: 8px;
    text-align: center;
    background: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
  }
}
</style>
