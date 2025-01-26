<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import EntryCard from './EntryCard.vue'
import { scrollToHash } from '@/composables/window'
import { useHeadingsStore } from '@/stores/headings'

interface Props<T extends TableRow> {
  entries: {
    heading: CardHeading
    rows: T[]
  }[]
  headers: BasicTableHeader[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  <v-virtual-scroll
    :items="entries"
    height="100%"
  >
    <template #default="{ item: entry }">
      <EntryCard
        :title="entry.heading"
        :headers="headers"
        :items="entry.rows"
      >
        <template #item="{ item }">
          <slot
            name="item"
            :item="item"
          />
        </template>
      </EntryCard>
    </template>
  </v-virtual-scroll>
</template>

<style scoped>
:deep(.v-virtual-scroll__container) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:deep(.v-virtual-scroll__item) {
  padding: 0 2px;
}
</style>
