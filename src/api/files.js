import axios from '@/core/axios'

// types = "all" | "photos" | "trash"
export const getAll = async (type) => {
  // return (await axios.get('/files?type=' + type)).data
}

export const remove = (ids) => {
  return axios.delete('/files?ids=' + ids)
}

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }

  try {
    const { data } = await axios.post('files', formData, config)
    return data
  } catch (err) {
    console.log(err)
  }
}
