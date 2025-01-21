export const useHeadingsStore = defineStore('headings', () => {
  const headings: Ref<CardHeading[]> = ref([])
  function setHeadings(values: CardHeading[]) {
    headings.value = values
  }

  return {
    headings,
    setHeadings
  }
})
