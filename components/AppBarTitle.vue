<script setup lang="ts">
import RitchTextTitle from './RichTextTitle.vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const isSmallScreen = ref(width.value < 420)

const updateScreenWidth = () => {
  isSmallScreen.value = width.value < 420
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})
</script>

<template>
  <img
    v-if="isSmallScreen"
    src="../public/favicon.svg"
    alt="Logo"
    class="favicon mt-2"
  >
  <RitchTextTitle v-else />
</template>

<style scoped>
.favicon {
  height: 32px;
  width: 32px;
}
</style>