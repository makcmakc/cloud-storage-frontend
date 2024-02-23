import { defineStore } from 'pinia'
import { supabase } from '@/core/supabaseClient'
import { handleError } from '@/utils/handleError'


export const useAuthStore = defineStore('auth', {
  state:() => ({
    user: {},
    loading: false
  }),
  getters: {
    getUser: state => state.user,
  },
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null;
    },

    async login() {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
  
      if (error) handleError(error)
    },

    /**
     * Register
     */    
    async register() {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })

      if (error) handleError(error)
    },

    /**
     * Send user an email to reset their password
     * (ie. support "Forgot Password?")
     */
    async sendPasswordRestEmail(email) {

    },

    async logout() {
      try {
        this.loading = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        // alert(error.message)
      } finally {
        this.loading = false
      }
    },
    
    async getMe() {
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user
      console.log( user)
      // return user
    },

    async isAuthenticated() {
      await this.getMe()
      
    }
  }
})
