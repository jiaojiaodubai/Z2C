<script setup lang="ts">
import { capitalize } from 'vue'

const route = useRoute()

const validRoute = computed(() => {
  return typeof route.name === 'string' && ['itemType', 'field'].includes(route.name.substring(1))
})
const show = ref(false)

const currentDialog = ref(null)
watch(() => route.name, () => {
  if (validRoute.value) {
    try {
      const component = `${capitalize((route.name as string).substring(1))}Dialog`
      currentDialog.value = defineAsyncComponent(() => import(`./dialogs/${component}.vue`))
    } catch (error) {
      console.error('Failed to load dialog component:', error)
      currentDialog.value = null
    }
  } else {
    currentDialog.value = null
  }
})
</script>

<template>
  <v-tooltip
    v-if="validRoute"
    :text="$t(`dialogs.${($route.name as string).substring(1)}.title`)"
  >
    <template #activator="{ props: props }">
      <v-btn
        icon="mdi-filter-cog"
        v-bind="props"
        @click="show = !show"
      />
    </template>
  </v-tooltip>
  <component
    :is="currentDialog"
    v-model="show"
  />
</template>