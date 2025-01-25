<script setup lang="ts">
import AppBarTitle from './components/AppBarTitle.vue'
import CardsFilter from './components/CardsFilter.vue'
import ViewSwitcher from './components/ViewSwitcher.vue'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import TocSwitcher from './components/TocSwitcher.vue'
import AppFooter from './components/AppFooter.vue'

const { t } = useI18n()
// https://nuxt.com/docs/getting-started/seo-meta#dynamic-title
useHead({
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - ${t('title')}`
      : t('title')
  },
})

const enableToc = ref(false)
const showToc = ref(false)

const route = useRoute()
watch(() => route.name, () => {
  const getRouteBaseName = useRouteBaseName()
  const baseRouteName = getRouteBaseName(route)
  enableToc.value = baseRouteName !== '[...redirect]'
  showToc.value = baseRouteName !== '[...redirect]'
}, { immediate: true })
</script>

<template>
  <v-app>
    <v-app-bar id="app-bar">
      <v-app-bar-title>
        <AppBarTitle />
      </v-app-bar-title>
      <template #append>
        <CardsFilter v-if="$route.meta.filter" />
        <ViewSwitcher />
        <LocaleSwitcher />
        <ThemeSwitcher />
        <TocSwitcher
          v-if="enableToc"
          v-model="showToc"
        />
      </template>
    </v-app-bar>
    <v-main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </v-main>
    <AppFooter />
    <ClientOnly>
      <Toc
        v-if="enableToc"
        v-model="showToc"
      />
    </ClientOnly>
  </v-app>
</template>
