<template>
  <div class="list-item folder" @dblclick="handleMoveToFolder(folder)">
  <div class="list-item__icon"></div>
    <div class="list-item__info folder__info">
      <div class="list-item__name folder__name">
        {{ folder.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const handleMoveToFolder = (folder) => {
  console.log('Move to folder ->' , folder)
  router.push({ path: '/folder/' + folder.name, params: { id: folder.id } })
}

const props = defineProps({ folder: Object })

const { folder } = toRefs(props)

</script>

<style lang="scss">
.folder .list-item__icon {
  // position: relative;
  // display: inline-block;
  // vertical-align: middle;
  width: 150px;
  // max-height: 100%;
  // margin: 8px;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  &__name {
    // position: absolute;
    // bottom: -10px;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;    
    background-image: url('@/assets/folder.svg');
    width: 110px;
    height: 110px;
    margin: 0 auto;
  }
}
</style>