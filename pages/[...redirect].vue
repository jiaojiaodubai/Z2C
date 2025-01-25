<!-- https://uvr.esm.is/guide/file-based-routing.html#catch-all-404-not-found-route -->
<template>
  <div>
    <v-empty-state
      :title="$t('redrecting', { view: $t(`view.${selectedView}`) })"
      :image="favicon"
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
import { useStorage } from '@vueuse/core'
import RichTextTitle from '@/components/RichTextTitle.vue'
import favicon from '@/public/favicon.svg'
// explicit import
// https://vueuse.org/core/useStorage/

definePageMeta({
  layout: 'home',
})

const selectedView = useStorage('selectedView', 'itemType')
const router = useRouter()
const localePath = useLocalePath()
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
      router.replace(localePath(`/${selectedView.value}`))
    }
  }, period)
})
</script>
