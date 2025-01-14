<script setup>
const show = defineModel({
  type: Boolean,
  default: false
})

const emit = defineEmits(['filter-confirm'])

function onConfirm() {
  emit('filter-confirm')
  show.value = false
}
</script>

<template>
  <v-dialog
    v-model="show"
    width="500"
  >
    <v-card>
      <v-card-title
        class="bg-surface-light"
        style="padding-top: 10px;padding-bottom: 10px;"
      >
        {{ $t(`dialogs.${$route.name.substring(1)}.title`) }}
      </v-card-title>
      <div class="mx-1 mt-2">
        <slot />
      </div>
      <v-divider />
      <v-card-actions>
        <v-btn
          @click="onConfirm"
        >
          {{ $t('dialogs.confirm') }}
        </v-btn>
        <v-btn
          @click="show = false"
        >
          {{ $t('dialogs.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>