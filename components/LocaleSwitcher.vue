<script setup lang="ts">
import { mergeProps } from 'vue'

const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <v-menu>
    <template #activator="{ props: menu }">
      <v-tooltip :text="$t('appBar.tooltip.localeSwitcher')">
        <template #activator="{ props: tooltip }">
          <v-btn
            icon="mdi-translate"
            v-bind="mergeProps(menu, tooltip)"
          />
        </template>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="localeItem in $i18n.availableLocales"
        :key="localeItem"
        :value="localeItem"
        :active="localeItem === $i18n.locale"
        :to="switchLocalePath(localeItem)"
      >
        {{ $t(`locale.${localeItem}`) }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>