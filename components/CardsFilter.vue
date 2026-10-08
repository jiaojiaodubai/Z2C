<script setup lang="ts">
import { capitalize } from 'vue'

const show = ref(false)

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const baseRouteName = computed(() => {
  return getRouteBaseName(route)
})

const currentDialog = computed(() => {
  const routeName = baseRouteName.value
  if (!routeName) return null

  const component = `${capitalize(routeName)}Dialog`
  return defineAsyncComponent(() => import(`./dialogs/${component}.vue`))
})
</script>

<template>
  <v-tooltip
    :text="$t(`dialogs.${baseRouteName}.title`)"
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
