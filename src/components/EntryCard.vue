<script setup>
import CardTitle from './CardTitle.vue'
import WordBox from './WordBox.vue'

const props = defineProps({
  title: {
    type: Object,
    default() {
      return {
        text: '',
        value: ''
      }
    }
  },
  headers: {
    type: Array,
    default() {
      return []
    }
  },
  items: {
    type: Array,
    default() {
      return []
    }
  }
})

</script>

<template>
  <v-card :id="`entry-card-${props.title.value}`">
    <v-card-title :style="{ backgroundColor: $route.meta.color, color: 'white' }">
      <CardTitle
        :title="props.title.text"
        :value="props.title.value"
      >
        {{ props.title.text }}
      </CardTitle>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="props.headers"
        :items="props.items"
        items-per-page="-1"
        hide-default-footer
      >
        <template #item="{ item }">
          <tr>
            <td>
              <WordBox
                :text="item[props.headers[0].value]"
                :column-key="props.headers[0].value"
                :type="item.type"
              />
            </td>
            <td
              v-for="(header, index) in props.headers.slice(1)"
              :key="index"
            >
              <div
                v-if="Array.isArray(item[header.value])"
                class="word-box-container"
              >
                <WordBox
                  v-for="(subItem, subIndex) in item[header.value]"
                  :key="subIndex"
                  :text="subItem"
                  :column-key="header.value"
                  :type="item.type"
                />
              </div>
              <div v-else>
                <WordBox
                  :text="item[header.value]"
                  :column-key="header.value"
                  :type="item.type"
                />
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>