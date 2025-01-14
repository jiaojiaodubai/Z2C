<script setup>
import locales from '@/i18n/massages.mjs'
import { mergeProps } from 'vue'
import { useLocale } from 'vuetify'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
function setTitle() {
  document.title = t('title')
}

const { current } = useLocale()

const storedLocale = localStorage.getItem('locale')
if (storedLocale !== null) {
  current.value = JSON.parse(storedLocale)
}

setTitle()

function changeLocale (locale) {
  current.value = locale
  setTitle()
  localStorage.setItem('locale', JSON.stringify(current.value))
}
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
        v-for="key in Object.keys(locales)"
        :key="key"
        :value="key"
        :active="key === current"
        @click="changeLocale(key)"
      >
        <v-list-item-title>{{ $t(`locale.${key}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>