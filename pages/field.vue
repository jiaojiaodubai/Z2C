<script setup lang="ts">
import data from '@/data/schema.json'
import Cards from '@/components/Cards.vue'
import { useFieldStore } from '@/stores/dialogs'
import constant from '@/data/constant.json'

definePageMeta({
  color: '#E43B45',
  filter: true,
})

const { t } = useI18n()

const headers = ['zoteroItemType', 'cslType', 'ui'].map(key => ({
  title: computed(() => t(`header.${key}`)),
  key: key,
  value: key
}))

const fields: Set<string> = new Set()
for (const type of data.itemTypes) {
  for (const field of type.fields) {
    fields.add(field.field)
  }
}
const sortedFields = Array.from(fields).sort((a, b) => {
  const lowerA = a.toLowerCase()
  const lowerB = b.toLowerCase()
  return lowerA < lowerB ? -1 : lowerA > lowerB ? 1 : 0
})

const entries: {
  heading: CardHeading
  rows: FieldRow[]
}[]  = []
for (const field of sortedFields) {
  const itemTypes = data.itemTypes.filter(type => type.fields.some(obj => obj.field === field)).map(obj => obj.itemType)
  const rows = []
  for (const type of itemTypes) {
    rows.push({
      zoteroItemType: type,
      cslType: Object.keys(data.csl.types).find(key => data.csl.types[key as keyof typeof data.csl.types].includes(type)) || '',
      ui: computed(() => t(`labels.itemTypes.${type}`))
    })
  }
  entries.push({
    heading: {
      text: field,
      value: field
    },
    rows: rows
  })
}

const store = useFieldStore()

const results = computed(() => {
  switch(store.filterMode) {
  case 'hideCommonFields':
    return entries.filter(entry => {
      return !constant.field.common.includes(entry.heading.value)
    })
  default:
    return entries
  }
})
</script>

<template>
  <Cards
    :entries="results"
    :headers="headers"
  >
  <template #item="{ item }">
    <tr>
      <td>
        <WordBox
          :text="item.zoteroItemType"
          :to="{ name: 'itemType', hash: item.zoteroItemType as string }"
        />
      </td>
      <td>
        {{ item.cslType }}
      </td>
      <td>
        {{ item.ui }} 
      </td>
    </tr>
  </template>
  </Cards>
</template>