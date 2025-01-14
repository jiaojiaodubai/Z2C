<script setup>
import { mergeProps } from 'vue'
import { useRouter } from 'vue-router'

const views = {
  itemType: {
    icon: 'mdi-alpha-i-box-outline',
    color: 'purple'
  },
  field:{
    icon: 'mdi-alpha-z-box-outline',
    color: 'red-darken-3'
  },
  variable: {
    icon: 'mdi-alpha-c-box-outline',
    color: 'blue'
  }
}

const router = useRouter()

function selectView(key) {
  localStorage.setItem('selectedView', key)
  router.push(`/${key}`)
}
</script>

<template>
  <v-menu>
    <template #activator="{ props: menu }">
      <v-tooltip :text="$t('appBar.tooltip.viewSwitcher')">
        <template #activator="{ props: tootip }">
          <v-btn
            icon="mdi-eye"
            v-bind="mergeProps(menu, tootip)"
          />
        </template>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(att, key) in views"
        :key="key"
        :title="$t(`view.${key}`)"
        :active="key === $route.name.replace(/^\//, '')"
        :value="key"
        @click="selectView(key)"
      >
        <template #append>
          <v-icon
            :icon="att.icon"
            :color="att.color"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
