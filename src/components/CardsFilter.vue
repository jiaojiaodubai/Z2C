<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { capitalize } from 'vue'

const show = ref(false)

const route = useRoute()

const currentDialog = computed(() => {
  const component = `${capitalize(route.name.substring(1))}Dialog`
  return defineAsyncComponent(() => import(`./dialogs/${component}.vue`))
})

</script>

<template>
  <v-tooltip :text="$t(`dialogs.${$route.name.substring(1)}.title`)">
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