import { defineStore } from 'pinia'
import { supabase } from '@/core/supabaseClient'
import { handleError } from '@/utils/handleError'


export const useAuthStore = defineStore('auth', {
  state:() => ({
    user: {},
  }),
  getters: {
    getUser: state => state.user,
  },
  actions: {
    async login() {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
  
      if (error) handleError(error)
    },
    async register() {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })

      if (error) handleError(error)
    },
    async logout() {
      supabase.auth.signOut()
    },
    async getMe() {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }    
  }
})
