<script setup>
import { onMounted, onUnmounted, ref } from 'vue'


const showFab = ref(false)
const handleScroll = () => {
  showFab.value = window.scrollY > 1000
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <v-container
    fluid
    class="d-flex"
    style="min-height: 100%;"
  >
    <v-row justify="center">
      <v-col cols="auto">
        <router-view />
      </v-col>
      <v-fab
        v-if="showFab"
        id="go-to-top"
        icon="mdi-arrow-up-bold"
        :color="$route.meta.color"
        style="z-index: 1004; position: fixed; bottom: 80px; right: 300px;"
        transition="scroll-y-reverse-transition"
        :appear="true"
        @click="scrollToTop"
      />
    </v-row>
  </v-container>
</template>
