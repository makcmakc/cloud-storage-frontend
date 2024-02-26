import { defineStore } from 'pinia'
import { supabase } from '@/core/supabaseClient'
import { handleError } from '@/utils/handleError'

export const useFilesStore = defineStore('files', {
  state: () => ({
    loading: false,
    files: [],
    buckets: [],
    photos: [],
    uploadingFiles: [],
    publicURL: '',
    sort: 'by-name',
    view: 'by-tile',
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
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getFiles: state => state.files,
    getPhotos: state => state.photos,
    getBuckets: state => state.buckets,
    getView: state => state.view,
    getSort: state => state.sort,
    getViewSettings: state => state.viewSettings,
    getSortSettings: state => state.sortSettings,
    getUploadingFiles: state => state.uploadingFiles,
  },
  actions: {
    async fetchFiles() {
      this.loading = true
      const { data, error } = await supabase.storage
        .from('avatars')
        .list();
      
      if (error) handleError(error)

      // [BUG]?? supabase creates empty object .emptyFolderPlaceholder
      // this.files = data.slice(1)

      this.files = data
  
      this.loading = false
    },
    async fetchPhotos() {
      const { data, error } = await supabase
      .storage
      .from('storage')
      .list()
  
      this.photos = data.filter(el => isImage(el.metadata.mimetype))

      if (error) handleError(error)

      return data      
    },
    async fetchBuckets() {
      const { data, error } = await supabase
        .storage
        .from('avatars')

      this.buckets = data

      if (error) handleError(error)

      return data
    },
    async fetchPublicURL() {
      const { data, error } = supabase
        .storage
        .from('avatars')
        .getPublicUrl('/')

      if (error) handleError(error)

      this.publicURL = data
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
