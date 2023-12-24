// import axios from '@/core/axios'
// import { destroyCookie } from 'nookies'

import { supabase } from '@/core/supabaseClient'

// export const login = async values => {
//   // console.log('Login data', values)
//   // return (await axios.post('/auth/login', values)).data
// }

// export const register = async values => {
//   console.log('Register data', values)
//   return (await axios.post('/auth/register', values)).data
// }

export const getMe = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const logout = async () => {
  return supabase.auth.signOut()
  // destroyCookie(null, '_token', { path: '/' })
}
