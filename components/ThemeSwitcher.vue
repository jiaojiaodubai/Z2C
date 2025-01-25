<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useStorage } from '@vueuse/core'

const isDarkMode = useStorage('darkMode', false)

const theme = useTheme()
theme.global.name.value = isDarkMode.value ? 'dark' : 'light'

const themeIcon = computed(() => isDarkMode.value ? 'mdi-weather-night' : 'mdi-white-balance-sunny')

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light'
}
</script>

<template>
  <v-tooltip :text="$t('appBar.tooltip.themeSwitcher')">
    <template #activator="{ props }">
      <v-btn
        :icon="themeIcon"
        v-bind="props"
        @click="toggleTheme"
      />
    </template>
  </v-tooltip>
</template>
