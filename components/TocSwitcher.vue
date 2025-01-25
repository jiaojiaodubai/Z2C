<script setup lang="ts">
const toc = defineModel({ type: Boolean })
</script>

<template>
  <v-tooltip :text="$t(`appBar.tooltip.tocSwitcher.${toc ? 'collapse' : 'expand'}`)">
    <template #activator="{ props }">
      <v-btn
        icon="mdi-dock-right"
        v-bind="props"
        @click="toc = !toc"
      />
    </template>
  </v-tooltip>
</template>
