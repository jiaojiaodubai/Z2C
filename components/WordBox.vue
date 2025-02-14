<script setup lang="ts">
interface Props {
  text?: string
  to?: {
    name: string
    hash: string
  }
}

const { text, to } = defineProps<Props>()

const wordBoxRef = ref<HTMLSpanElement | null>(null)
const snackbar = ref(false)

const copyToClipboard = () => {
  if (wordBoxRef.value) {
    navigator.clipboard.writeText(wordBoxRef.value.innerText)
      .then(() => {
        snackbar.value = true
      })
  }
}
</script>

<template>
  <div class="word-box">
    <span
      ref="wordBoxRef"
      class="word-box-text"
      @click="copyToClipboard"
    >
      {{ text }}
    </span>
    <nuxt-link-locale
      v-if="to?.name && to?.hash"
      :to="{ name: to.name, hash: `#${to.hash}` }"
      class="word-box-btn ml-1"
    >
      <v-icon
        icon="mdi-information-variant-circle-outline"
        size="em"
      />
    </nuxt-link-locale>
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

.word-box-text:hover {
  cursor: pointer;
  color: v-bind('$route.meta.color');
}

.word-box-btn {
  color: inherit;
}

.word-box-btn:hover {
  color: v-bind('$route.meta.color');
}

:deep(.v-snackbar__content) {
  text-align: center;
}
</style>
