<script setup lang="ts">

</script>

<template>
  <div>
    <Header></Header>

    <div class="wrapper">
      <div class="app">
        <Aside></Aside>

        <main class="app-content">
          <div class="app-content__inner">
            <slot></slot>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
