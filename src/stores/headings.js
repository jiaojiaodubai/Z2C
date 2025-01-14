// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHeadingsStore = defineStore('headings', () => {
  const headings = ref([])
  function setHeadings(values) {
    headings.value = values
  }

  return {
    headings,
    setHeadings
  }
})
