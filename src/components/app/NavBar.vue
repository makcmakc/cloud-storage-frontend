<template>
  <div class="app-navbar">
    <div class="app-navbar__inner">
      <RouterLink to="/files" class="app-navbar-link">
        <fileIcon style="font-size: 1em" />
        <span>Файлы</span>
      </RouterLink>
      <RouterLink to="/photos" class="app-navbar-link">
        <imageMultiple style="font-size: 1em" />
        <span>Галерея</span>
      </RouterLink>      
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.app-navbar {
  padding: 0 20px;

  &__inner {
    display: flex;
    gap: 20px;
  }
}

.app-navbar-link {
  font-size: 14px;
}

.router-link-active.router-link-exact-active.app-navbar-link {
  background: none;
}
</style>