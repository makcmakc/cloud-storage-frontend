<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import UploadButton from '@/components/UploadButton.vue'
import fileIcon from '~icons/mdi/file';
import imageMultiple from '~icons/mdi/image-multiple';
import deleteOutline from '~icons/mdi/delete-outline';

import sortReverseVariant from '~icons/mdi/sort-reverse-variant';
import formatListBulleted from '~icons/mdi/format-list-bulleted';
import appsIcon from '~icons/mdi/apps';
import chevronDown from '~icons/mdi/chevron-down';

import { ref } from 'vue';

let typeSortingVisibility = ref(false)

const handleOpen = (e) => {
  // console.log('oapsdojas', e)
  typeSortingVisibility = !typeSortingVisibility
}

</script>

<script>
import { VueSelecto } from 'vue3-selecto'

export default {
  components: {
    VueSelecto
  },
  data() {
    return {
      dragContainer: document.querySelector('.container'),
    }
  },
  methods: {
    // onDragStart(e) {
    //   console.log('ds', e.inputEvent.target)
    // },
    onSelectStart(e) {
      // console.log('start', e)
      e.added.forEach((el) => {
        el.classList.add('selected')
      })
      e.removed.forEach((el) => {
        el.classList.remove('selected')
      })
    },
    onSelectEnd(e) {
      // console.log('end', e)
      e.afterAdded.forEach((el) => {
        el.classList.add('selected')
        if (el.classList.contains('red')) {
          // el.style.backgroundColor = 'red'
        }
      })
      e.afterRemoved.forEach((el) => {
        el.classList.remove('selected')
      })
    },
    onSelect(e) {
      // console.log('select', e)
      e.added.forEach((el) => {
        el.classList.add('active')
      })
      e.removed.forEach((el) => {
        el.classList.remove('active')
      })
    },
    onKeydown() {
      document.querySelector('.button').classList.add('selected')
    },
    onKeyup() {
      document.querySelector('.button').classList.remove('selected')
    }
  }
}
</script>

<template>
  <TheAppLayout />
  <!-- <Header />

  <div class="wrapper">

    <div class="app">
      <aside class="app-aside">
        <div class="app-aside__upload">
          <UploadButton />
        </div>

        <nav class="app-aside__nav">
          <ul class="app-aside__list">
            <li class="app-aside__list-item">
              <RouterLink to="/files">
                <fileIcon style="font-size: 1em;" />
                <span>Файлы</span>
              </RouterLink>
            </li>
            <li class="app-aside__list-item">
              <RouterLink to="/photos">
                <imageMultiple style="font-size: 1em;" />
                <span>Фото</span>
              </RouterLink>
            </li>
            <li class="app-aside__list-item">
              <RouterLink to="/trash">
                <deleteOutline style="font-size: 1em;" />
                <span>Корзина</span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="app-aside__info">
          <div class="info-space">
            <div class="indicator-bar">
              <div class="indicator-bar__value" style="width:49.21%"></div>
            </div>
            <div class="info-space__footer">
              <div class="info-space__text">Свободно 2,53&nbsp;ГБ из 5&nbsp;ГБ</div>
            </div>
          </div>
        </div>
      </aside>

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
                  <formatListBulleted style="font-size: 1.3em;" />
                  <appsIcon style="font-size: 1.3em;" />
                  <div class="btn__arrow">
                    <chevronDown />
                  </div>
                </button>
              </span>

            </div>
          </div>

          <RouterView />
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
  </div> -->
</template>

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
  background: none;

      border: 1px solid #dcdfe6;
      padding: 8px;


      text-align: center;

      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
  }
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}



.info-space__footer {
  margin-top: 10px;
}

.info-space {
  margin-top: 12px;
  display: block;
  color: #000;
  border-radius: 4px;
  background: linear-gradient(180deg,#42b883,#def1db);
  padding: 16px 12px;
}

.indicator-bar {
  background-color: rgba(0,0,0,.07);
  position: relative;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: darken(#42b883, 8%);
}

.indicator-bar .indicator-bar__value {
  border-radius: 4px;
  background: #fff;
}


.indicator-bar__value {
  position: relative;
  height: 8px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;
  background-color: #6c6;
}
</style>
