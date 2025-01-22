<script setup lang="ts">
import schema from '@/data/schema.json'
import Cards from '@/components/Cards.vue'
import WordBox from '@/components/WordBox.vue'
import { useItemTypeStore } from '@/stores/dialogs'
import constant from '@/data/constant.json'

definePageMeta({
  color: '#9C27B0',
  filter: true,
})

const { t } = useI18n()

const headers = ['zoteroTerm', 'cslTerm', 'ui', 'type'].map(key => ({
  title: computed(() => t(`header.${key}`)),
  key: key,
  value: key
}))

const entries: {
  heading: CardHeading,
  rows: ItemTypeRow[]
}[] = []
for (const typeObject of schema.itemTypes) {
  const itemType = {
    zoteroTerm: typeObject.itemType,
    cslTerm: Object.keys(schema.csl.types).find(key => schema.csl.types[key as keyof typeof schema.csl.types].includes(typeObject.itemType)) || '',
    type: 'itemType' as const,
    ui: computed(() => t(`labels.itemTypes.${typeObject.itemType}`))
  }
  const fields = typeObject.fields.map(fieldObject => {
    // 如果有baseField，优先使用baseField
    const searchField = fieldObject.baseField || fieldObject.field
    const textFields = schema.csl.fields.text
    const dateFields = schema.csl.fields.date
    const textValue = Object.keys(textFields).find(key => textFields[key as keyof typeof textFields].includes(searchField))
    const dateValue = Object.keys(dateFields).find(key => dateFields[key as keyof typeof dateFields] === searchField )
    return {
      zoteroTerm: fieldObject.field,
      cslTerm: textValue || dateValue || '',
      type: 'field' as const,
      ui: computed(() => t(`labels.fields.${fieldObject.field}`))
    }
  })
  const creatorTypes = typeObject.creatorTypes.map(obj => ({
    zoteroTerm: obj.creatorType,
    cslTerm: obj.primary ? 'author' : schema.csl.names[obj.creatorType as keyof typeof schema.csl.names],
    type: 'creatorType' as const,
    ui: computed(() => t(`labels.creatorTypes.${obj.creatorType}`))
  }))
  entries.push({
    heading: {
      text: itemType.zoteroTerm,
      value: itemType.zoteroTerm
    },
    rows: [
      itemType,
      ...fields,
      ...creatorTypes
    ]
  })
}

const store = useItemTypeStore()

const results = computed(() => {
  switch (store.filterMode) {
  case 'hideZoteroSpecificTypes':
    return entries.filter(entry => {
      return !constant.itemType.zoteroSpecific.includes(entry.heading.value)
    })
  case 'showCommonTypesOnly':
    return entries.filter(entry => {
      return constant.itemType.common.includes(entry.heading.value)
    })
  case 'manuallySelect':
    return entries.filter(entry => {
      return store.selectedItemTypes.includes(entry.heading.value)
    })
  default:
    return entries
  }
})
</script>

<template>
  <cards
    :entries="results"
    :headers="headers"
  >
    <template #item="{ item }">
      <tr>
        <td>
          <WordBox
            :text="item.zoteroTerm"
            :to="item.type === 'field' ? { name: 'field', hash: item.zoteroTerm as string } : undefined"
          />
        </td>
        <td>
          <WordBox
            :text="item.cslTerm"
            :to="item.type === 'field' ? { name: 'field', hash: item.cslTerm as string } : undefined"
          />
        </td>
        <td>{{ item.type }}</td>
        <td>{{ item.ui }}</td>
      </tr>
    </template>
  </cards>
</template>