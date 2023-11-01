<template>
  <div>
    <Header />

    <div class="wrapper">
      <div class="app">
        <Aside />

        <main class="app-content">
          <div class="app-content__inner">
            <div
              class="client-listing__head"
              :class="{ 'client-listing__head--trash': this.$route.meta.title === 'Корзина' }"
            >
              <div class="client-listing__heading">
                <h1 class="client-listing__heading-title">{{ this.$route.meta.title }}</h1>
              </div>

              <div class="client-listing__settings" v-if="this.$route.meta.title !== 'Корзина'">
                <span class="settings-by-sort">
                 <n-dropdown trigger="click" :options="sortSettings" @select="handleSortSelect">
                    <n-button icon-placement="right">
                      <template #icon>
                        <n-icon>
                          <chevronDown />
                        </n-icon>
                      </template>
                      <sortReverseVariant style="font-size: 1.3em" />
                    </n-button>
                  </n-dropdown>                  
                </span>

                <span class="settings-by-type">
                  <n-dropdown trigger="click" :options="viewSettings" @select="handleViewSelect">
                    <n-button icon-placement="right">
                      <template #icon>
                        <n-icon>
                          <chevronDown />
                        </n-icon>
                      </template>
                      <formatListBulleted style="font-size: 1.3em; display: none" />
                      <appsIcon style="font-size: 1.3em" />
                    </n-button>
                  </n-dropdown>
                </span>
              </div>
            </div>

            <Suspense>
              <RouterView />
              <template #fallback> Loading... </template>
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
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import sortReverseVariant from '~icons/mdi/sort-reverse-variant'
import formatListBulleted from '~icons/mdi/format-list-bulleted'
import appsIcon from '~icons/mdi/apps'
import chevronDown from '~icons/mdi/chevron-down'
import Aside from '@/components/Aside.vue'
</script>

<script>
import { VueSelecto } from 'vue3-selecto'
import { useViewStore } from '../stores/view'

export default {
  name: 'default',
  components: {
    VueSelecto
  },
  data() {
    return {
      dragContainer: document.querySelector('.container'),
      selectedIds: [],
      filesView: 'tile',
      sortSettings: [
        {
          label: 'Сортировка',
          key: 'Marina Bay Sands',
          disabled: true
        },
        {
          label: "По названию",
          key: "by-name"
        },
        {
          label: 'По размеру',
          key: 'by-size'
        },
        {
          label: 'По типу',
          key: 'by-type'
        },
        {
          label: 'По Дате изменения',
          key: 'by-date'
        },                
      ],
      viewSettings: [
        {
          label: 'Вид',
          key: 'view',
          disabled: true
        },
        {
          label: "Плитка",
          key: "by-tile"
        },
        {
          label: 'Список',
          key: 'by-list'
        },
      ],
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

    onFileSelect(id, type) {
      if (type === 'select') {
        // setSelectedIds((prev) => [...prev, id]);
        // console.log(id)
        this.selectedIds.push(id)
        console.log(this.selectedIds)
      }
    },

    onSelect(e) {
      console.log('Select', e)
      e.added.forEach(el => {
        el.classList.add('active')
        this.onFileSelect(Number(el.dataset['id']), 'select')
      })
      e.removed.forEach(el => {
        el.classList.remove('active')
        this.onFileSelect(Number(el.dataset['id']), 'unselect')
      })
    },
    // onKeydown() {
    //   document.querySelector('.button').classList.add('selected')
    // },
    // onKeyup() {
    //   document.querySelector('.button').classList.remove('selected')
    // }

    handleSortSelect(e) {
      const viewStore = useViewStore()
      viewStore.sort = e
      console.log('Select by sort : ', e, viewStore.sort)

    },

    handleViewSelect(e) {
      const viewStore = useViewStore()
      viewStore.view = e
      console.log('Select by view : ', e, viewStore.view)

    },

    handleView() {
      this.filesView = 'list'
      localStorage.setItem('VcloudView', 'list')
    }
  }
}
</script>




<style lang="scss">
.n-dropdown-menu .n-dropdown-option .n-dropdown-option-body.n-dropdown-option-body--disabled {
  cursor: default !important;
}
.btn {
  color: #000;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
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
