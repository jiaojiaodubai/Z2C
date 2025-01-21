<script setup lang="ts">
import { scrollToHash } from '@/composables/window'
import EntryCard from './EntryCard.vue'
import { useHeadingsStore } from '@/stores/headings'

interface Props<T extends TableRow> {
  entries: {
    heading: CardHeading
    rows: T[]
  }[]
  headers: BasicTableHeader[]
}

const { entries, headers } = defineProps<Props<any>>()

const store = useHeadingsStore()
watch(() => entries, () => {
  store.setHeadings(entries.map(entry => entry.heading))
}, { immediate: true })

const route = useRoute()
onMounted(() => {
  const hash = route.hash.substring(1)
  if (hash) {
    scrollToHash(hash)
  }
})
</script>

<template>
  <div class="cards">
    <EntryCard
      v-for="entry in entries"
      :key="entry.heading.value"
      :title="entry.heading"
      :headers="headers"
      :items="entry.rows"
    >
    <template #item="{ item }">
      <slot name="item" :item="item" />
    </template>
  </EntryCard>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>