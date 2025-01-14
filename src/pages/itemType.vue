<script setup>
import { definePage } from 'unplugin-vue-router/runtime'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'
import { reactive, computed } from 'vue'
import data from '@/data/schema.json'
import { toUILabel } from '@/composables/locale'
import Cards from '@/components/Cards.vue'
import { useItemTypeStore } from '@/stores/dialogs'
import constant from '@/data/constant.json'

definePage({
  meta: {
    color: '#9C27B0',
    filter: true
  }
})

const { t } = useI18n()
const { current } = useLocale()

const headers = reactive(['zoteroTerm', 'cslTerm', 'ui', 'type'].map(key => ({
  title: computed(() => t(`header.${key}`)),
  key: key,
  value: key
})))

const entries = reactive([])
for (const type of data.itemTypes) {
  const itemType = {
    zoteroTerm: type.itemType,
    cslTerm: Object.keys(data.csl.types).find(key => data.csl.types[key].includes(type.itemType)),
    type: 'itemType',
    ui: computed(() => toUILabel(current.value, type.itemType, 'itemType'))
  }
  const fields = type.fields.map(obj => {
    const zField = obj.field
    const textFields = data.csl.fields.text
    const dateFields = data.csl.fields.date
    const textValue = Object.keys(textFields).find(key => textFields[key].includes(zField))
    const dateValue = Object.keys(dateFields).find(key => dateFields[key] === zField )
    return {
      zoteroTerm: zField,
      cslTerm: textValue || dateValue,
      type: 'field',
      ui: computed(() => toUILabel(current.value, zField, 'field'))
    }
  })
  const creatorTypes = type.creatorTypes.map(obj => ({
    zoteroTerm: obj.creatorType,
    cslTerm: data.csl.names[obj.creatorType],
    type: 'creatorType',
    ui: computed(() => toUILabel(current.value, obj.creatorType, 'creatorType'))
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
  />
</template>