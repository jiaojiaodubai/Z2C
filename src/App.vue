<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <AppBarTitle />
      </v-app-bar-title>
      <template #append>
        <CardsFilter v-if="$route.meta.filter" />
        <View />
        <LocaleSwitcher />
        <ThemeSwitcher />
        <TocSwitcher
          v-if="enableToc"
          v-model="showToc"
        />
      </template>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.name"
          />
        </transition>
      </router-view>
    </v-main>
    <AppFooter />
    <Toc
      v-if="enableToc"
      v-model="showToc"
    />
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppBarTitle from '@/components/AppBarTitle.vue'
import CardsFilter from '@/components/CardsFilter.vue'
import View from '@/components/ViewSwitcher.vue'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import AppFooter from '@/components/AppFooter.vue'
import Toc from '@/components/Toc.vue'
import TocSwitcher from '@/components/TocSwitcher.vue'

const route = useRoute()

const enableToc = ref(false)
const showToc = ref(false)

watch(() => route.name, () => {
  enableToc.value = route.path !== '/'
  showToc.value = route.path !== '/'
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
