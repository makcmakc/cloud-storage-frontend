<template>
  <div>
    <button @click="deleteHandler">
      Delete
    </button>

    <button @click="shareHandler">
      Share
    </button>
  </div>
</template>

<script>
export default {
 name: 'files',
 methods: {
    deleteHandler() {
      
    },
    shareHandler() {
      alert('Share')
    }
  }
}
</script>

<style>

</style>