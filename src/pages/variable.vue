<script setup>
import { definePage } from 'unplugin-vue-router/runtime'
import { useI18n } from 'vue-i18n'
import { useLocale } from 'vuetify'
import { reactive, computed } from 'vue'
import constant from '@/data/constant.json'
import schema from '@/data/schema.json'
import { toUILabel } from '@/composables/locale'

definePage({
  meta: {
    color: '#2196F3'
  }
})

const { t } = useI18n()
const { current } = useLocale()


const headers = reactive(['cslVariable', 'zoteroField', 'ui'].map(key => ({
  title: computed(() => t(`header.${key}`)),
  key: key,
  value: key
})))

const entries = reactive([])
function genEntry(name, target, labelType='field') {
  return {
    heading: {
      text: computed(() => t(`variable.heaing.${name}`)),
      value: name
    },
    rows: constant.variable[name].map((variable) => {
      const zField = target[variable]
      return {
        cslVariable: variable,
        zoteroField: zField,
        ui: Array.isArray(zField)
          ? zField.map(z => toUILabel(current.value, z, labelType))
          : toUILabel(current.value, zField, labelType)
      } 
    })
  }
}
entries.push(genEntry('text', schema.csl.fields.text, 'field'))
entries.push(genEntry('number', schema.csl.fields.text, 'field'))
entries.push(genEntry('date', schema.csl.fields.date, 'field'))
entries.push(genEntry('name', schema.csl.names, 'creatorType'))
</script>

<template>
  <Cards
    :entries="entries"
    :headers="headers"
  />
</template>