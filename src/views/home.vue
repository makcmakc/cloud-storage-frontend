<template>
  <div class="list list--theme-tile">
    <!-- <div class="button">Shift</div> -->

    <div class="list__items">
    <div class="list-item target red"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    <div class="list-item target"></div>
    </div>

    <vue-selecto
      :selectableTargets="['.target']"
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
  </div>
</template>
<style lang="scss" scoped>

.list {
  &__items {
    position: relative;
    /* height: 100%;
    margin: 0;
    padding: 0; */
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    border: 2px solid #fff;
    padding: 50px;
    justify-content: space-between;
  }
}

.target {
  background: #faa;
  width: 80px;
  height: 80px;

  padding: 12px;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 4px;

  display: flex;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  // width: 100%;
  padding: 16px 20px;
  color: var(--color-mg-typo-primary);
  font-size: 13px;
  line-height: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &.active {
    filter:   drop-shadow(3px 3px red) sepia(100%) drop-shadow(-3px -3px blue);;;
  }
}
.target.selected {
  border: 4px solid #f55;
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
<script>
import { VueSelecto } from 'vue3-selecto'
export default {
  components: {
    VueSelecto
  },
  data() {
    return {
      dragContainer: document.querySelector('.container'),
    }
  },
  methods: {
    onDragStart(e) {
      console.log('ds', e.inputEvent.target)
    },
    onSelectStart(e) {
      console.log('start', e)
      e.added.forEach((el) => {
        el.classList.add('selected')
      })
      e.removed.forEach((el) => {
        el.classList.remove('selected')
      })
    },
    onSelectEnd(e) {
      console.log('end', e)
      e.afterAdded.forEach((el) => {
        el.classList.add('selected')
        if (el.classList.contains('red')) {
          // el.style.backgroundColor = 'red'
        }
      })
      e.afterRemoved.forEach((el) => {
        el.classList.remove('selected')
      })
    },
    onSelect(e) {
      console.log('select', e)
      e.added.forEach((el) => {
        el.classList.add('active')
      })
      e.removed.forEach((el) => {
        el.classList.remove('active')
      })
    },
    onKeydown() {
      document.querySelector('.button').classList.add('selected')
    },
    onKeyup() {
      document.querySelector('.button').classList.remove('selected')
    }
  }
}
</script>