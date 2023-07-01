<template>
  <div class="client-listing">


    <div class="client-listing__container" v-if="listItems">
      <div class="container">
        <div class="list__items list--theme-tile">

          <FileCard v-for="item in listItems" :key="item.id" :item="item" />

        </div>
      </div>
    </div>
    
    <div class="client-listing__container" v-else>
      <div class="container">


        <div class="empty">
          <div class="empty__file">
            <div class="empty__file-bg">
              <div class="empty__file-icon"></div>
            </div>
            <div class="empty__icon">
              <svg width="29" height="33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.275 13.177l-.137 14.51a2 2 0 001.745 2.002l8.698 1.119a2 2 0 002.195-1.496l3.54-14.072" stroke="#7A8595" stroke-width="2"></path><path d="M3.85 4.869a1 1 0 10-.256 1.984l.255-1.984zm22.659 4.93a1 1 0 00.255-1.983L26.509 9.8zM3.594 6.854L12.76 8.03l.255-1.983-9.166-1.18-.255 1.985zM17.343 8.62l9.166 1.18.255-1.984-9.166-1.179-.255 1.984zm-3.464-1.454l.462-3.591-1.983-.255-.462 3.591 1.983.255zm.462-3.591l2.6.334.255-1.983-2.6-.335-.255 1.984zm2.6.334L16.479 7.5l1.983.255.462-3.59-1.984-.256zm.657 2.727l-4.583-.59-.255 1.984 4.583.59.255-1.984zM16.94 3.91l1.984.255a2 2 0 00-1.729-2.238L16.94 3.91zm-2.599-.334l.255-1.984a2 2 0 00-2.239 1.729l1.984.255z" fill="#7A8595"></path>
              </svg>
            </div>
          </div>
          <div class="empty__title">Корзина пуста</div>
          <div class="empty__text">Вы всегда можете удалить файлы из корзины чтобы освободить место</div>
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

let listItems = ref(await Api.files.getAll('trash'))
console.log(listItems)

</script>

<style lang="scss" scoped>
.empty {
  -webkit-font-smoothing: antialiased;
  align-items: center;
  align-self: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // font-family: MailSans,Arial,"sans-serif";
  // font-family: var(--font-tt-norms);
  margin: 0 auto 32px;
  max-width: 100%;
  padding-top: 10vh;
  text-align: center;
  width: 640px;

  &__title {
    word-wrap: break-word;
    color: #000;
    color: var(--paradigm--color_true_black--normal);
    font-size: 20px;
    font-weight: 500;
    margin-top: 28px;
    max-width: 100%;
  }

  &__text {
    color: #919399;
    font-size: 15px;
    margin-top: 12px;
    white-space: pre;
  }
}



.empty__file {
  height: 106px;
  position: relative;
  width: 86px;
}

.empty__file-bg {
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
}

.empty__icon {
  bottom: 20px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}

.empty__file-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4yNCAwSDE2djRhMiAyIDAgMCAwIDIgMmg0djE4LjQ3YzAgLjc1OS0uNzU1IDEuNTMtMS41NTUgMS41M0gxLjU1NUMuODM1IDI2IDAgMjUuNDI3IDAgMjQuNDdWMS41M0MwIC42NTIuNzE0IDAgMS41NTUgMEgxMi4yNFoiIGZpbGw9IiNGMEYwRjAiLz48L3N2Zz4=);
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
</style>