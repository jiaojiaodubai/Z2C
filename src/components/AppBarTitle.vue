<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import RitchTextTitle from './RichTextTitle.vue'

const isSmallScreen = ref(window.innerWidth < 420)

const updateScreenWidth = () => {
  isSmallScreen.value = window.innerWidth < 420
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
    src="../assets/favicon.svg"
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