import { defineStore } from 'pinia'
import { supabase } from '@/core/supabaseClient'
import { handleError } from '@/utils/handleError'

export const useFilesStore = defineStore('files', {
  state:() => ({
    files: [],
    buckets: [],
    publicURLs: [],
    photos: [],
    sort: 'by-name',
    view: 'by-tile',
    uploadingFiles: [],
    sortSettings: [
      {
        label: 'Сортировка',
        key: 'Marina Bay Sands',
        isTitle: true
      },
      {
        label: "По названию",
        key: "by-name"
      },
      {
        label: 'По размеру',
        key: 'by-size'
      },
      {
        label: 'По типу',
        key: 'by-type'
      },
      {
        label: 'По Дате изменения',
        key: 'by-date'
      },                
    ],
    viewSettings: [
      {
        label: 'Вид',
        key: 'view',
        isTitle: true
      },
      {
        label: "Плитка",
        key: "by-tile",
      },
      {
        label: 'Список',
        key: 'by-list'
      },
    ]
  }),
  getters: {
    getFiles: state => state.files,
    getBuckets: state => state.buckets,
    getView: state => state.view,
    getSort: state => state.sort,
    getViewSettings: state => state.viewSettings,
    getSortSettings: state => state.sortSettings,
    getUploadingFiles: state => state.uploadingFiles
  },
  actions: {
    async fetchFiles() {
      const { data, error } = await supabase
        .storage
        .from('images')
        .list('/')

      this.files = data

      console.log('data : ', data, this.files)

      if (error) handleError(error)

      return data
    },
    async fetchPhotos() {
      const { data, error } = await supabase
      .storage
      .from('storage')
      .list('images/', {
        // limit: 12
      })
  
      // this.photos = data.filter(el => isImage(el.metadata.mimetype) )

      if (error) handleError(error)

      return data      
    },
    async fetchBuckets() {
      const { data, error } = await supabase
        .storage
        .listBuckets()

      this.buckets = data

      if (error) handleError(error)

      return data
    },
    async fetchPublicURLs() {
      const { data, error } = supabase
        .storage
        .from('storage')
        .getPublicUrl('images/')

      this.publicURLs = data

      if (error) handleError(error)
    },
    updateView(payload) {
      this.view = payload
      localStorage.setItem('VCloudView', payload)
    },
    updateSort(payload) {
      console.log(payload)
      switch (payload) {
        case 'by-size':
          this.files = this.files.sort((a, b) => a.metadata.size - b.metadata.size)
          break
        case 'by-name':
          this.files = this.files.sort((a, b) => a.name - b.name)
          break
        case 'by-date':
          this.files = this.files.sort((a, b) => new Date(a.created_at) - new Date(b.created_at) )
          break
        case 'by-type':
          this.files = this.files.sort((a, b) => a.metadata.mimetype - b.metadata.mimetype)
          break    
        default:
          this.files = this.files.sort((a, b) => a.name - b.name)
      }
      this.sort = payload
      console.log(this.files)
      localStorage.setItem('VCloudSort', payload)
    },
    downloadFile(payload) {
      // const { data, error } = await supabase
      //   .storage
      //   .from('avatars')
      //   .download('folder/avatar1.png')   
      
      //     const { data, error } = await supabase.storage.from('avatars/public').download(path.value)
//     if (error) throw error
//     src.value = URL.createObjectURL(data)
        
      console.log(payload)

      return payload
    },
    uploadFiles(payload) {
      console.log(payload)
      this.uploadingFiles = payload
    }
  },
})
