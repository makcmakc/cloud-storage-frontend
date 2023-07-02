import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useViewStore = defineStore('view', {
  state:() => ({
    view: 'tile'
  })
})