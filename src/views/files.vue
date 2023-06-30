<template>
  <div class="client-listing">

    <div class="client-listing__container">
      <div class="container">
        <div class="list__items list--theme-tile">
          <!-- :originalName="originalName" :fileName="item.fileName"  
          <FileCard
          -->
          <!-- {{ listItems }} -->
     
          <div class="file">
            <FileCard :item="item" v-for="item in listItems" :key="item.id" />
            <!-- {{ item.size }} -->
          </div>

          <!-- <FileCard v-for="item in listItems" :key="item.id" :item="item" /> -->

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
import { onBeforeMount, onMounted, ref } from 'vue';


// const run = asyncFn => asyncFn()

let listItems = ref(await Api.files.getAll())


// run(async () => {
//   listItems = await Api.files.getAll()
//   console.log(listItems)
// })


//  ;(async () => {
//    let res = await Api.files.getAll()
//    listItems = res;
//    console.log(res);
//  })()

onBeforeMount(async () => {
  // try {
    // listItems = await Api.files.getAll()
    // console.log(listItems)
  // } catch (error) {
    // console.log(error)
  // }
})


// const getAllFiles = async () => {
    // try {
    //   listItems = await Api.files.getAll()
    // } catch (e) {
    //   console.log(e)
    // }
// }

// getAllFiles()

// onMounted( () => {
  // getAllFiles()
// })

// try {
//   const listItems = await Api.files.getAll()
// } catch (e) {
//   console.log(e)
// }

</script>


<style lang="scss">
.list {
  &__items {
    position: relative;
    gap: 5px;
  }

  &-item {
    max-width: 150px;
    height: 180px;
    padding: 12px;
    border-radius: 8px;

    align-items: center;
    flex-direction: column;
    position: relative;
    display: flex;
    flex-shrink: 0;
    color: var(--color-mg-typo-primary);
    font-size: 13px;
    line-height: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;

    &:hover,
    &.active,
    &.selected {
      background: #f5f5f5;
    }

    &.selected:hover {
      background: #EBEEF5;
    }

    &__icon {
      width: 120px;
      height: 120px;
      align-items: flex-end;
      position: relative;
      display: flex;
      order: 0;
      flex-shrink: 0;
      justify-content: center;

      img {
        max-height: 120px;
        max-width: 120px;
        box-sizing: border-box;
        display: block;
      }
    }

    &__info {
      display: flex;
      flex-grow: 1;
      align-items: center;
      padding-left: 20px;
      overflow: hidden;
      padding: 0;
      height: 40px;
      justify-content: center;
      align-items: flex-end;
      order: 1;
    }

    &__name {
      height: 30px;
      word-break: break-all;
      line-height: 14px;
      text-align: center;
      width: 100%;


      span {
        display: inline-block;
        word-break: break-all;
        white-space: pre-line;
        max-width: 90px;
        text-overflow: ellipsis;
      }
    }

    &__ext {
      font-style: normal;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      position: absolute;
      bottom: 0px;
      left: 0px;
      text-transform: uppercase;
      background-color: #777;
      padding: 3px 6px;
      border-radius: 4px;
    }
  }
}

.list--theme-tile {
  display: flex;
  width: 100%;
}
</style>
