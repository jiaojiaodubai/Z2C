<script setup lang="ts">
import DialogFrame from './DialogFrame.vue'
import { useFieldStore } from '@/stores/dialogs'
// import schema from '@/data/schema.json'

const show = defineModel({
  type: Boolean,
  default: false
})

const store = useFieldStore()
</script>

<template>
  <DialogFrame v-model="show">
    <v-radio-group v-model="store.filterMode">
      <v-radio
        value="showAllFields"
        :label="$t('dialogs.field.showAllFields')"
      />
      <v-radio
        value="hideCommonFields"
        :label="$t('dialogs.field.hideCommonFields')"
      />
    </v-radio-group>
  </DialogFrame>
</template>