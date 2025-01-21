<script setup lang="ts">
import AppBarTitle from './components/AppBarTitle.vue'
import CardsFilter from './components/CardsFilter.vue'
import ViewSwitcher from './components/ViewSwitcher.vue'
import LocaleSwitcher from './components/LocaleSwitcher.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import TocSwitcher from './components/TocSwitcher.vue'

const { t } = useI18n()
// https://nuxt.com/docs/getting-started/seo-meta#dynamic-title
useHead({
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - ${t('title')}`
      : t('title')
  }
})

const route = useRoute()

const enableToc = ref(false)
const showToc = ref(false)

watch(() => route.name, () => {
  console.log(route.name)
  enableToc.value = route.path !== '/'
  showToc.value = route.path !== '/'
})
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
    <!-- <AppFooter /> -->
    <Toc
      v-if="enableToc"
      v-model="showToc"
    />
  </v-app>
</template>
