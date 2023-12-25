<template>
  <div>
    <Header></Header>

    <div class="wrapper">
      <div class="app">
        <Aside></Aside>

        <main class="app-content">
          <div class="app-content__inner">

            <Suspense>
              <RouterView />
              <template #fallback> Loading... </template>
            </Suspense>
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

<script>
// import { VueSelecto } from 'vue3-selecto'
// import { useViewStore } from '../stores/view'

// export default {
//   name: 'default',
//   components: {
//     VueSelecto
//   },
//   data() {
//     return {
//       dragContainer: document.querySelector('.container'),
//       selectedIds: [],
//     }
//   },
//   methods: {
//     onSelectStart(e) {
//       e.added.forEach(el => el.classList.add('selected'))
//       e.removed.forEach(el => el.classList.remove('selected'))
//     },
//     onSelectEnd(e) {
//       e.afterAdded.forEach(el => el.classList.add('selected'))
//       e.afterRemoved.forEach(el => el.classList.remove('selected'))
//     },

//     onFileSelect(id, type) {
//       if (type === 'select') {
//         // setSelectedIds((prev) => [...prev, id]);
//         // console.log(id)
//         this.selectedIds.push(id)
//         console.log(this.selectedIds)
//       }
//     },

//     onSelect(e) {
//       console.log('Select', e)
//       e.added.forEach(el => {
//         el.classList.add('active')
//         this.onFileSelect(Number(el.dataset['id']), 'select')
//       })
//       e.removed.forEach(el => {
//         el.classList.remove('active')
//         this.onFileSelect(Number(el.dataset['id']), 'unselect')
//       })
//     },
//     // onKeydown() {
//     //   document.querySelector('.button').classList.add('selected')
//     // },
//     // onKeyup() {
//     //   document.querySelector('.button').classList.remove('selected')
//     // }

//     hanleDragover(e) {
//       e.preventDefault();
//       // Add some visual fluff to show the user can drop its files
//       console.log(e)
//       if (!e.currentTarget.classList.contains('is-dragover')) {
//         // e.currentTarget.classList.remove('bg-gray-100');
//         e.currentTarget.classList.add('is-dragover');
//       }
//     },

//     handleDragleave(e) {
//       // Clean up
//       // e.currentTarget.classList.add('bg-gray-100');
//       e.currentTarget.classList.remove('is-dragover');
//     },

//     handleDrop(e) { 
//             console.log(e)
//       e.preventDefault();
//       // this.$refs.file.files = e.dataTransfer.files;

//       // this.onChange(); // Trigger the onChange event manually
//       // Clean up
//       // e.currentTarget.classList.add('bg-gray-100');
//       e.currentTarget.classList.remove('is-dragover');
//     },    


//     handleSortSelect(e) {
//       const viewStore = useViewStore()
//       viewStore.sort = e
//       console.log('Select by sort : ', e, viewStore.sort)

//     },

//     handleViewSelect(e) {
//       const viewStore = useViewStore()
//       viewStore.view = e
//       console.log('Select by view : ', e, viewStore.view)

//     },

//     handleView() {
//       this.filesView = 'list'
//       localStorage.setItem('VcloudView', 'list')
//     }
//   }
// }
</script>




<style lang="scss">
.n-dropdown-menu .n-dropdown-option .n-dropdown-option-body.n-dropdown-option-body--disabled {
  cursor: default !important;
}

.is-dragover {
  border: 2px dashed #0c7a43;
  background: rgba(0, 0, 0, .1) !important;
  opacity: .7;
  position: relative;
  z-index: 9;

  &::after {
    content: 'Загрузите файлы на диск';
    font-size: 42px;
    left: 50%;
    top: 20%;
    position: absolute;
    transform: translate(-50%);
  }
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
