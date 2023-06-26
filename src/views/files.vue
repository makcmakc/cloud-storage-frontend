<template>
  <div class="client-listing">

    
    <div class="client-listing__container">
      <div class="container">
        <div class="list__items list--theme-tile">
          

          <div v-for="item in listItems" :key="item.id">
            <FileCard :item="item"  />
          </div>
          
          <!-- <div class="list-item">
            <div class="list-item__icon">
              <i class="list-item__ext"></i>
              <img src="https://w.forfun.com/fetch/59/594a7ca775cfa7df41a4f9e70af26140.jpeg" class="list-item__img" alt="">
            </div>
            <div class="list-item__info">
              <div class="list-item__name">
                <span>Cara Delevingne</span>
              </div>
            </div>
          </div>

          <div class="list-item">
            <div class="list-item__icon">
              <i class="list-item__ext"></i>
              <img src="https://hips.hearstapps.com/hmg-prod/images/cara6-1643645738.jpg?resize=980:*" class="list-item__img" alt="">
            </div>
            <div class="list-item__info">
              <div class="list-item__name">
                <span>Cara Delevingne cover interview | Manifesting a baby and leading with kindness.jpeg</span>
              </div>
            </div>
          </div>

          <div class="list-item">
            <div class="list-item__icon">
              <i class="list-item__ext"></i>
              <img src="https://w.forfun.com/fetch/59/594a7ca775cfa7df41a4f9e70af26140.jpeg" class="list-item__img" alt="">
            </div>
            <div class="list-item__info">
              <div class="list-item__name">
                <span>Cara Delevingne</span>
              </div>
            </div>
          </div> -->

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

const listItems = [
  {
    id: 1,
    filename: 'Cara Delevingne',
    originalName: 'Cara Delevingne',
    size: 4903,
    mimetype: 'image',
    user: null,
    deletedAt: new Date(),
    createdAt: new Date(),

    // demo
    url: 'https://w.forfun.com/fetch/59/594a7ca775cfa7df41a4f9e70af26140.jpeg'
  },
  {
    id: 2,
    filename: 'Cara Delevingne',
    originalName: 'Cara Delevingne cover interview | Manifesting a baby and leading with kindness',
    size: 4903,
    mimetype: 'image',
    user: null,
    deletedAt: new Date(),
    createdAt: new Date(),

    // demo
    url: 'https://hips.hearstapps.com/hmg-prod/images/cara6-1643645738.jpg'
  },
  {
    id: 3,
    filename: 'Cara Delevingne',
    originalName: "Cara Delevingne's New Bangs Are the Opposite of Blunt",
    size: 4903,
    mimetype: 'image',
    user: null,
    deletedAt: new Date(),
    createdAt: new Date(),

    // demo
    url: 'https://media.allure.com/photos/646fb788ebb02dd9906ca147/3:2/w_3243,h_2162,c_limit/cara%20delevingne%20choppy%20bangs%20.jpg'
  },
  {
    id: 4,
    filename: 'Cara Delevingne',
    originalName: "Cara Delevingne' Book",
    size: 4903,
    mimetype: 'pdf',
    user: null,
    deletedAt: new Date(),
    createdAt: new Date(),

    // demo
    url: 'https://media.allure.com/photos/646fb788ebb02dd9906ca147/3:2/w_3243,h_2162,c_limit/cara%20delevingne%20choppy%20bangs%20.jpg'
  }    
]

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
        // border: 1px solid rgba(0,0,0,.1);
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

.target {
  background: #42b883;
  width: 60px;
  height: 60px;
  padding: 10px;

  padding: 12px;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 4px;

  display: flex;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  // width: 100%;
  // padding: 16px 20px;/
  color: var(--color-mg-typo-primary);
  font-size: 13px;
  line-height: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &.active {
    background: darken(#42b883, 8%);
  }
}
.target.selected {
  border: 4px solid #f55;
  padding: 20px;
}
.button {
  position: absolute;
  left: 500px;
  top: 50px;
  background: #eee;
  padding: 15px 40px;
  display: inline-block;
  border-radius: 5px;
  font-weight: bold;
  color: #444;
}
.button.selected {
  color: #fff;
  background: #66d;
}
</style>
