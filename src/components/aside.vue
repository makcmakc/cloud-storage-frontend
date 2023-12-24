<template>
  <aside class="app-aside">
    <div class="app-aside__upload">
      <UploadButton />
    </div>

    <nav class="app-aside__nav">
      <RouterLink to="/files" class="app-aside__nav-link">
        <fileIcon style="font-size: 1em" />
        <span>Файлы</span>
      </RouterLink>
      <RouterLink to="/photos" class="app-aside__nav-link">
        <imageMultiple style="font-size: 1em" />
        <span>Фото</span>
      </RouterLink>
      <RouterLink to="/trash" class="app-aside__nav-link">
        <deleteOutline style="font-size: 1em" />
        <span>Корзина</span>
      </RouterLink>
    </nav>

    <div class="app-aside__info">
      <div class="info-space">
        <div class="info-space__header">
          <n-collapse arrow-placement="right">
            <template #header-extra>
              <n-icon><sharpAddchart /></n-icon>
            </template>
            <n-collapse-item title="Storage">
              <div class="info-space__details">
                <div class="info-space__details-category">
                  <div class="category-title">
                    <fileIcon />
                    <span>Documents</span>
                  </div>
                  <div class="category-summary">
                    21.2 MB
                  </div>                  
                </div>
                <div class="info-space__details-category">
                  <div class="category-title">
                    <imageMultiple />
                    <span>Images</span>
                  </div>
                  <div class="category-summary">
                    21.2 MB
                  </div>                  
                </div>
                <div class="info-space__details-category">
                  <div class="category-title">
                    <audioIcon />
                    <span>Audio</span>
                  </div>
                  <div class="category-summary">
                    21.2 MB
                  </div>
                </div>
                <div class="info-space__details-category">
                  <div class="category-title">
                    <otherIcon />
                    <span>Other</span>
                  </div>
                  <div class="category-summary">
                    21.2 MB
                  </div> 
                </div>                                        
              </div>
            </n-collapse-item>
          </n-collapse>
        </div>
        <div class="indicator-bar">
          <div class="indicator-bar__value" :style="'width:' + storageCapacity + '%'"></div>
        </div>
        <div class="info-space__footer">
          <div class="info-space__text">
            Свободно {{ humanFileSize(freeSpace, true) }} из
            {{ humanFileSize(storageVolume, true) }}
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import UploadButton from '@/components/UploadButton.vue'
import fileIcon from '~icons/mdi/file'
import imageMultiple from '~icons/mdi/image-multiple'
import deleteOutline from '~icons/mdi/delete-outline'
import chevronRight from '~icons/mdi/chevron-right'
import sharpAddchart from '~icons/ic/sharp-addchart'
import audioIcon from '~icons/gridicons/audio'
import otherIcon from '~icons/icon-park-outline/other'
</script>

<script>
import * as Api from '@/api'

export default {
  name: 'aside',
  data() {
    return {
      filesSize: null,
      storageVolume: 20000000
    }
  },
  methods: {
    /**
     * Format bytes as human-readable text.
     *
     * @param bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use
     *           binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     *
     * @return Formatted string.
     */
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024

      if (Math.abs(bytes) < thresh) {
        return bytes + ' B'
      }

      const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      let u = -1
      const r = 10 ** dp

      do {
        bytes /= thresh
        ++u
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

      return bytes.toFixed(dp) + ' ' + units[u]
    }
  },
  async mounted() {
    // const files = await Api.files.getAll()
    // const sizes = files.map(el => el.size).reduce((a, b) => a + b, 0)

    // this.filesSize = sizes




    // console.log('SIZES :',  humanFileSize(sizes, true), sizes)
  },
  computed: {
    // filesSize() {}
    storageCapacity() {
      return ((this.filesSize / this.storageVolume) * 100).toFixed(2)
    },
    freeSpace() {
      return this.storageVolume - this.filesSize
    }
  }
}
</script>

<style lang="scss">
.app-aside__upload .n-button,
.app-aside__upload .n-upload-trigger {
  width: 100% !important;
}
</style>