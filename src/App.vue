<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>


<script setup>
import { RouterView } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";


// import client from './views/client.vue'
// import { supabase } from '@/core/supabaseClient'
// import { useAuthStore } from '@/stores/auth' 
// import { ref } from 'vue';

// const appReady = ref(null);
// const user = supabase?.auth?.user();

// console.log(user)

// const authStore = useAuthStore();

// // If user does not exist, need to make app ready
// if (!user) {
//     appReady.value = true
// }

// // Runs when there is a auth state change
// // if user is logged in, this will fire
// supabase.auth.onAuthStateChange((_, session) => {
//     authStore.setUser(session);
//     appReady.value = true;
// })
</script>

