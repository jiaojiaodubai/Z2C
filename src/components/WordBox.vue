<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const wordBoxRef = ref(null)
const snackbar = ref(false)

const copyToClipboard = () => {
  if (wordBoxRef.value) {
    navigator.clipboard.writeText(wordBoxRef.value.innerText)
      .then(() => {
        snackbar.value = true
      })
  }
}

defineProps({
  text: {
    type: String,
    default: ''
  }
})

const hoverColor = computed(() => route.meta.color)
</script>

<template>
  <div
    ref="wordBoxRef"
    class="word-box"
    :style="{ '--hover-color': hoverColor }"
    @click="copyToClipboard"
  >
    <slot>{{ text }}</slot>
  </div>
  <v-snackbar
    v-model="snackbar"
    location="top center"
    timeout="1000"
    theme="light"
  >
    <v-icon
      class="mr-2"
      color="success"
      icon="mdi-check-circle-outline"
    />
    {{ $t('wordBox.snackBar.copied') }}
  </v-snackbar>
</template>

<style scoped>
.word-box {
  transition: color 0.3s;
}

.word-box:hover {
  cursor: pointer;
  color: var(--hover-color);
}

:deep(.v-snackbar__content) {
  text-align: center;
}
</style>