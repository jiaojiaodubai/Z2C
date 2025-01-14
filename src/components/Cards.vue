<script setup>
import { watch } from 'vue'
import EntryCard from './EntryCard.vue'
import { useHeadingsStore } from '@/stores/headings'

const props = defineProps({
  entries: {
    type: Array,
    default() {
      return []
    }
  },
  headers: {
    type: Array,
    default() {
      return []
    }
  }
})

const store = useHeadingsStore()
watch(() => props.entries, () => {
  store.setHeadings(props.entries.map(entry => entry.heading))
}, { immediate: true })
</script>

<template>
  <div class="cards">
    <EntryCard
      v-for="entry in props.entries"
      :key="entry.heading"
      :title="entry.heading"
      :headers="props.headers"
      :items="entry.rows"
    />
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>