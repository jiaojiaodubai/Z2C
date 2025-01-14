<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

const storedDarkMode = localStorage.getItem('darkMode')
const isDarkMode = ref(storedDarkMode != 'false')

const theme = useTheme()
theme.global.name.value = isDarkMode.value ? 'dark' : 'light'

const themeIcon = computed(() => isDarkMode.value ? 'mdi-weather-night' : 'mdi-white-balance-sunny')

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light'
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value));
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