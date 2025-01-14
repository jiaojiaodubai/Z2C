<script setup>
import { definePage } from 'unplugin-vue-router/runtime'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'
import { reactive, computed } from 'vue'
import data from '@/data/schema.json'
import { toUILabel } from '@/composables/locale'
import Cards from '@/components/Cards.vue'
import { useFieldStore } from '@/stores/dialogs'
import constant from '@/data/constant.json'

definePage({
  meta: {
    color: '#E43B45',
    filter: true
  }
})

const { t } = useI18n()
const { current } = useLocale()

const headers = reactive(['zoteroItemType', 'csl', 'ui'].map(key => ({
  title: computed(() => t(`header.${key}`)),
  key: key,
  value: key
})))

const fields = new Set()
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

const entries = reactive([])
for (const field of sortedFields) {
  const itemTypes = data.itemTypes.filter(type => type.fields.some(obj => obj.field === field)).map(obj => obj.itemType)
  const rows = []
  for (const type of itemTypes) {
    rows.push({
      zoteroItemType: type,
      csl: Object.keys(data.csl.types).find(key => data.csl.types[key].includes(type)),
      ui: computed(() => toUILabel(current.value, type, 'itemType'))
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
  />
</template>