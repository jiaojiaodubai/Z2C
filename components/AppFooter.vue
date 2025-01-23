<script setup lang="ts">
import data from '@/data/schema.json'
// @ts-ignore
const buildTime = ref(__BUILDING_TIME__)
</script>

<template>
  <v-footer
    height="40"
    class="elevation-4"
    app
  >
    <i18n-t
      keypath="footer"
      scope="global"
      tag="div"
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      <template #schema>
        <a
          class="text-decoration-none on-surface"
          href="https://raw.githubusercontent.com/zotero/zotero-schema/master/schema.json"
          rel="noopener noreferrer"
          target="_blank"
        >
          schema.json v{{ data.version }}
        </a>
      </template>
      <template #time>
        {{ buildTime }}
      </template>
    </i18n-t>
  </v-footer>
</template>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>

