<script setup>
import { scrollToHash } from '@/composables/window'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <router-link
    :to="`#${props.value}`"
    class="hash-title pl-4"
    @click.prevent="scrollToHash(props.value)"
  >
    <h2 :id="`heading-${props.value}`">
      <span class="hash-symbol">#</span>
      <slot>{{ props.title }}</slot>
    </h2>
  </router-link>
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