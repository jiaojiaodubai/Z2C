<script setup lang="ts">
import { mergeProps } from 'vue'

const views = {
  itemType: {
    icon: 'mdi-alpha-i-box-outline',
    color: '#9C27B0'
  },
  field:{
    icon: 'mdi-alpha-z-box-outline',
    color: '#E43B45'
  },
  variable: {
    icon: 'mdi-alpha-c-box-outline',
    color: '#2196F3'
  }
}

const router = useRouter()
const localePath = useLocalePath()

function selectView(key: string) {
  localStorage.setItem('selectedView', key)
  router.push(localePath(`/${key}`))
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
        :active="key === $getRouteBaseName($route)"
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
