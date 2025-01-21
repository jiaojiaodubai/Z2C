<script setup lang="ts">
import { useItemTypeStore } from '@/stores/dialogs'
import DialogFrame from './DialogFrame.vue'
import schema from '@/data/schema.json'

const show = defineModel({
  type: Boolean,
  default: false
})

const store = useItemTypeStore()
const filterMode = ref(store.filterMode)
const selectedItemTypes = ref(store.selectedItemTypes)

function onConfirm() {
  store.filterMode = filterMode.value
  store.selectedItemTypes = selectedItemTypes.value
}
</script>

<template>
  <DialogFrame
    v-model="show"
    @filter-confirm="onConfirm"
  >
    <v-radio-group v-model="filterMode">
      <v-radio
        value="showAllTypes"
        :label="$t('dialogs.itemType.showAllTypes')"
      />
      <v-radio
        value="hideZoteroSpecificTypes"
        :label="$t('dialogs.itemType.hideZoteroSpecificTypes')"
      />
      <v-radio
        value="showCommonTypesOnly"
        :label="$t('dialogs.itemType.showCommonTypesOnly')"
      />
      <v-radio
        value="manually"
        :label="$t('dialogs.itemType.manuallySelect')"
      />
    </v-radio-group>
    <v-expand-transition>
      <v-select
        v-if="filterMode === 'manuallySelect'"
        v-model="selectedItemTypes"
        :items="schema.itemTypes.map(type => type.itemType)"
        :label="$t('dialogs.itemType.selectedItemTypes')"
        chips
        multiple
      />
    </v-expand-transition>
  </DialogFrame>
</template>