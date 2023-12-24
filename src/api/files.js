// import axios from '@/core/axios'
import { supabase } from '@/core/supabaseClient'

// // types = "all" | "photos" | "trash"
// export const getAll = async (type) => {
//   // return (await axios.get('/files?type=' + type)).data
// }

// export const remove = (ids) => {
//   return axios.delete('/files?ids=' + ids)
// }

export const uploadFile = async (file) => {
  try {
    const { error } = await supabase
      .storage
      .from('avatars')
      .upload('public' + '/' + file.name, file)
    // if (error) message.error(error)
  } catch (error) {
    console.log(error)
  }

  // try {
  //   const { data } = await axios.post('files', formData, config)
  //   return data
  // } catch (err) {
  //   console.log(err)
  // }
}
