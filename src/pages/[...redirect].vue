<!-- https://uvr.esm.is/guide/file-based-routing.html#catch-all-404-not-found-route -->
<template>
  <div>
    <v-empty-state
      :title="$t('redrecting', { view: $t(`view.${selectedView}`) })"
      image="src/assets/favicon.svg"
    >
      <template #headline>
        <RichTextTitle class="mt-3" />
      </template>
    </v-empty-state>
    <v-progress-linear
      v-model="progress"
      :color="progressColor"
      height="6"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import RichTextTitle from '@/components/RichTextTitle.vue'

const selectedView = localStorage.getItem('selectedView') || 'itemType'
const router = useRouter()
const progress = ref(0)

const startColor = { r: 204, g: 41, b: 54 } // #CC2936
const endColor = { r: 0, g: 136, b: 204 } // #0088CC

const progressColor = computed(() => {
  const r = Math.round(startColor.r + (endColor.r - startColor.r) * (progress.value / 100))
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * (progress.value / 100))
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * (progress.value / 100))
  return `rgb(${r}, ${g}, ${b})`
})

onMounted(() => {
  const delay = 250
  const period = 100
  const increment = 100 / (delay / period)

  const progressInterval = setInterval(() => {
    progress.value += increment
    if (progress.value >= 100) {
      clearInterval(progressInterval)
      router.replace(`/${selectedView}`)
    }
  }, period)
})
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>

<route lang="yaml">
meta:
  layout: centering
</route>