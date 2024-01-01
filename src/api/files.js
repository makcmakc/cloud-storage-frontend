// import axios from '@/core/axios'
import { supabase } from '@/core/supabaseClient'

// // types = "all" | "photos" | "trash"
// export const getAll = async (type) => {
//   // return (await axios.get('/files?type=' + type)).data
// }

// export const remove = (ids) => {
//   return axios.delete('/files?ids=' + ids)
// }

export const getFiles = async () => {
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .list('public/')

  return { data, error }
}


export const createBucket = async () => {
  const { data, error } = await supabase
    .storage
    .createBucket('avatars', {
      public: false,
      allowedMimeTypes: ['image/png'],
      fileSizeLimit: 1024
    })
}

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

export const replaceFile = async (file, payload) => {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .update('public/avatar1.png', avatarFile, {
      cacheControl: '3600',
      upsert: true
    })
}

export const downloadFile = async (file) => {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .download('folder/avatar1.png')
}

export const moveFile = async (file) => {
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .move('public/avatar1.png', 'private/avatar2.png')
}

export const copyFile = async (file) => {
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .copy('public/avatar1.png', 'private/avatar2.png')
}

export const deleteFiles = async (files) => {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .remove(['folder/avatar1.png'])
}

export const createSignedURLs = async () => {
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
}

