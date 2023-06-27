<template>
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
</template>

<script setup>
import UploadButton from '@/components/UploadButton.vue'
import fileIcon from '~icons/mdi/file';
import imageMultiple from '~icons/mdi/image-multiple';
import deleteOutline from '~icons/mdi/delete-outline';

</script>