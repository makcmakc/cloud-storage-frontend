<template>
  <div class="list-item folder" @dblclick="handleMoveToFolder(folder)">
    <div class="folder__info">
      <div class="folder__name">
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
.folder {
  width: 142px;
  height: 142px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
  margin: 8px;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  &__name {
    position: absolute;
    bottom: -10px;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;    
    background-image: url('@/assets/folder.svg');
  }
}
</style>