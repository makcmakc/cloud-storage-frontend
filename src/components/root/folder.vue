<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">Файлы</el-breadcrumb-item>
      <el-breadcrumb-item>{{ router.currentRoute.value.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <h1>INSIDE FOLDER</h1> -->

  </div>
</template>

<script setup>
import { toRefs } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

// const props = defineProps({ id: Number })

// const { folder } = toRefs(props)


console.log(router.currentRoute.value.params.id)
</script>

<style>

</style>