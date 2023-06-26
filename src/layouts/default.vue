<template>
  <div>
    <h1>DEFAULT LAYOUT</h1>
    <slot></slot>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'default',
})
</script>