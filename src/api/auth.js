import axios from '@/core/axios'
import { destroyCookie } from 'nookies'

export const login = async values => {
  console.log('Login data', values)
  return (await axios.post('/auth/login', values)).data
}

export const register = async values => {
  console.log('Register data', values)
  return (await axios.post('/auth/register', values)).data
}

export const getMe = async () => {
  return (await axios.get('/users/me')).data
}

export const logout = () => {
  destroyCookie(null, '_token', { path: '/' })
}
