import schema from '@/data/schema.json'
import constant from '@/data/constant.json'

export const useItemTypeStore = defineStore('itemType', () => {
  const filterMode = ref('hideZoteroSpecificTypes')
  const selectedItemTypes = ref(
    schema.itemTypes.map(type => type.itemType).filter((type) => {
      return !constant.itemType.zoteroSpecific.includes(type)
    }),
  )

  return {
    filterMode,
    selectedItemTypes,
  }
})

export const useFieldStore = defineStore('field', () => {
  const filterMode = ref('hideCommonFields')

  return {
    filterMode,
  }
})
