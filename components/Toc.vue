<!-- eslint-disable vue/multi-word-component-names -->
<!-- inspired by https://github.com/vuetifyjs/vuetifypackages/docs/src/components/app/Toc.vue -->
<script setup lang="ts">
import { scrollToHash } from '@/composables/window'
import { useHeadingsStore } from '@/stores/headings'

const show = defineModel({ type: Boolean })

const store = useHeadingsStore()

const router = useRouter()

const activeStack: string[] = []
const activeItem = ref('')
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      activeStack.push(entry.target.id)
    }
    else if (activeStack.includes(entry.target.id)) {
      activeStack.splice(activeStack.indexOf(entry.target.id), 1)
    }
  })
  activeItem.value = activeStack.at(-1) || activeItem.value || `heading-${store.headings[0].value}` || ''
}, { rootMargin: '-10% 0px -75%' })

async function observeToc() {
  activeStack.length = 0
  activeItem.value = ''
  observer.disconnect()
  await nextTick()
  store.headings.forEach((heading) => {
    const element = document.getElementById(`heading-${heading.value}`)
    if (element) {
      observer.observe(element)
    }
  })
}

// https://pinia.vuejs.org/zh/core-concepts/state.html#subscribing-to-the-state
// use watch won't works when route changed
store.$subscribe((mutation) => {
  if (mutation.storeId === 'headings') {
    observeToc()
  }
})

onMounted(() => {
  observeToc()
})
onScopeDispose(() => {
  observer.disconnect()
})

/* chang hash when activeItem is stable */
let timeout = -1
watch(activeItem, async (val) => {
  if (!val) return
  clearTimeout(timeout)
  // SSR: client only
  timeout = window.setTimeout(() => {
    const hash = val.substring(8)
    if (router.currentRoute.value.hash !== hash) {
      router.replace({ hash: `#${hash}` })
    }
    const activeElm = document.getElementById(`toc-item-${hash}`)
    if (activeElm) {
      activeElm.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 200)
})
</script>

<template>
  <v-navigation-drawer
    id="toc"
    v-model="show"
    color="background"
    location="right"
    width="230"
    floating
  >
    <template #prepend>
      <div class="text-h6 font-weight-medium mt-4 mb-2 ms-4">
        {{ $t('toc.title') }}
      </div>
    </template>
    <v-list
      density="compact"
      class="ms-5"
    >
      <nuxt-link-locale
        v-for="heading in store.headings"
        :key="heading.value"
        :to=" { hash: `#${heading.value}` }"
        custom
      >
        <v-list-item
          :id="`toc-item-${heading.value}`"
          :value="heading.value"
          :active="`heading-${heading.value}` === activeItem"
          :color="$route.meta.color as string"
          :class="{
            'ps-3 text-body-2 py-1 font-weight-regular': true,
            'text-medium-emphasis': `heading-${heading.value}` !== activeItem,
          }"
          @click.prevent="scrollToHash(heading.value)"
        >
          <v-list-item-title>
            {{ heading.text }}
          </v-list-item-title>
        </v-list-item>
      </nuxt-link-locale>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-list-item {
  border-left: 2px solid rgb(var(--v-theme-on-surface-variant));
}

.v-list-item.v-list-item--active {
  border-left-color: currentColor;
}
</style>
