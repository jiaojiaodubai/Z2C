<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import constant from '@/data/constant.json'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  columnKey: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
})


const route = useRoute()
const wordBoxRef = ref(null)
const snackbar = ref(false)

const copyToClipboard = () => {
  if (wordBoxRef.value) {
    navigator.clipboard.writeText(wordBoxRef.value.innerText)
      .then(() => {
        snackbar.value = true
      })
  }
}

const targetPath = computed(() => {
  let path = ''
  if (props.columnKey && props.text) {
    switch (props.columnKey) {
    case 'zoteroTerm':
      if (props.type === 'itemType') {
        path = `/itemType#${props.text}`
      } else if (props.type === 'field') {
        path = `/field#${props.text}`
      }
      break
    case 'cslTerm':
      if (props.type === 'field') {
        const section = Object.keys(constant.variable).find(key => constant.variable[key].includes(props.text))
        if (section) {
          path = `/variable#${section}`
        }
      }
      break
    case 'zoteroItemType':
      path = `/itemType#${props.text}`
      break
    case 'zoteroField':
      path = `/field#${props.text}`
      break
    case 'cslVariable': {
      const section = Object.keys(constant.variable).find(key => constant.variable[key].includes(props.text))
      if (section) {
        path = `/variable#${section}`
      }
      break
    }
    }
  }
  return path
})

const hoverColor = computed(() => route.meta.color)
</script>

<template>
  <div class="word-box">
    <span
      ref="wordBoxRef"
      class="word-box-text"
      :style="{ '--hover-color': hoverColor }"
      @click="copyToClipboard"
    >
      {{ text }}
    </span>
    <v-btn
      v-if="targetPath"
      icon="mdi-arrow-top-right-thin-circle-outline"
      size="x-small"
      variant="text"
      class="word-box-btn"
      @click="$router.push(targetPath)"
    />
  </div>
  <v-snackbar
    v-model="snackbar"
    location="top center"
    timeout="1000"
    theme="light"
  >
    <v-icon
      class="mr-2"
      color="success"
      icon="mdi-check-circle-outline"
    />
    {{ $t('wordBox.snackBar.copied') }}
  </v-snackbar>
</template>

<style scoped>
.word-box {
  transition: color 0.3s;
}

.word-box-text:hover {
  cursor: pointer;
  color: var(--hover-color);
}

:deep(.v-snackbar__content) {
  text-align: center;
}
</style>