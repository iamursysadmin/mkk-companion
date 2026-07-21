import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const language = ref('en-US')

  return {
    language
  }
})
