<template>
  <button class="btn btn--upload" @click="uploadFile">
    <i class="btn-icon"><cloudUploadOutline /></i>
    <div class="upload-button__attach-wrapper">
      <input
        type="file"
        class="upload-button__attach"
        accept=""
        multiple=""
        title="Загрузить файлы"
      />
    </div>
    <span>Загрузить файл</span>
  </button>
</template>


<script setup>
import cloudUploadOutline from '~icons/mdi/cloud-upload-outline'
const uploadFile = () => {}
</script>


<style lang="scss" scoped>

.btn {
  position: relative;
  height: 42px;
  width: 100%;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: 0.2s background;

  &:hover {
    background: darken(hsla(160, 100%, 37%, 1), 5%);
    transition: 0.2s background;
  }
}

.btn.btn--upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 15px;
  color: #fff;

  span {
      font-weight: 600;
  }

  svg {
    margin-top: 4.5px;
  }
}

.upload-button__attach {
  display: block;
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 200%;
  opacity: 0;
  cursor: pointer;
}

.upload-button__attach-wrapper {
  overflow: hidden;
  position: absolute;
  right: -20px;
  left: -33px;
  bottom: 0;
  top: 0;
}

</style>

