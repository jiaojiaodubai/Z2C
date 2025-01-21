<script setup lang="ts">
import CardTitle from './CardTitle.vue'

interface Props<T> {
  title: CardHeading
  headers: BasicTableHeader[]
  items: T[]
}

const { title, headers, items } = defineProps<Props<any>>()

</script>

<template>
  <v-card :id="`entry-card-${title.value}`">
    <v-card-title :style="{ backgroundColor: $route.meta.color as string, color: 'white' }">
      <CardTitle
        :title="title.text as string"
        :value="title.value"
      >
        {{ title.text }}
      </CardTitle>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers as any"
        :items="items"
        items-per-page="-1"
        hide-default-footer
      >
        <template #item="{ item }">
          <slot name="item" :item="item" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>