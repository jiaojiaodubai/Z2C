<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { scrollToHash } from '@/composables/window'
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