<script setup lang="ts">
import { scrollToHash } from '@/composables/window'

interface Props {
  title?: string
  value?: string
}

const { title='', value='' } = defineProps<Props>()
</script>

<template>
  <nuxt-link-locale
    :to="{ hash: `#${value}` }"
    class="hash-title pl-4"
    @click.prevent="scrollToHash(`#${value}`)"
  >
    <h2 :id="`heading-${value}`">
      <span class="hash-symbol">#</span>
      <slot>{{ title }}</slot>
    </h2>
  </nuxt-link-locale>
</template>

<style scoped>
.hash-title {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}

.hash-title:hover {
  text-decoration: underline;
}

.hash-symbol {
  position: absolute;
  font-size: .75em;
  visibility: hidden;
  margin: 0 0 0 -0.75em;
}

.hash-title:hover .hash-symbol {
  visibility: visible;
}
</style>