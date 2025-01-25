<script setup lang="ts">
import constant from '@/data/constant.json'
import schema from '@/data/schema.json'

definePageMeta({
  color: '#2196F3',
})

const { t } = useI18n()

const headers = reactive(['cslVariable', 'zoteroField', 'ui'].map(key => ({
  title: computed(() => t(`header.${key}`)),
  key: key,
  value: key,
})))

const entries: {
  heading: CardHeading
  rows: VariableRow[]
}[] = []
function genEntry<
  T extends Record<string, string | string[]>,
>(varType: CslVariableType, target: T, labelType = 'fields') {
  return {
    heading: {
      text: computed(() => t(`variable.heading.${varType}`)),
      value: varType,
    },
    rows: constant.variable[varType].map((variable) => {
      let zField = target[variable]
      if (zField === undefined) {
        return {
          cslVariable: variable,
          zoteroField: '',
          ui: '',
        }
      }
      if (!Array.isArray(zField)) {
        zField = [zField]
      }
      for (const field of zField) {
        for (const obj of schema.itemTypes) {
          for (const f of obj.fields) {
            if (f.baseField === field && !zField.includes(f.field)) {
              zField.push(f.field)
            }
          }
        }
      }
      return {
        cslVariable: variable,
        zoteroField: zField,
        ui: zField.map(z => computed(() => t(`labels.${labelType}.${z}`))),
      }
    }),
  }
}

entries.push(genEntry('text', schema.csl.fields.text))
entries.push(genEntry('number', schema.csl.fields.text))
entries.push(genEntry('date', schema.csl.fields.date))
entries.push(genEntry('name', schema.csl.names, 'creatorTypes'))
</script>

<template>
  <Cards
    :entries="entries"
    :headers="headers"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.cslVariable }}</td>
        <td>
          <div class="multi-value-cell">
            <WordBox
              v-for="field in item.zoteroField"
              :key="field"
              :text="field"
              :to="{ name: 'field', hash: field as string }"
            />
          </div>
        </td>
        <td>
          <div class="multi-value-cell">
            <div
              v-for="text in item.ui"
              :key="text"
            >
              {{ text }}
            </div>
          </div>
        </td>
      </tr>
    </template>
  </Cards>
</template>
