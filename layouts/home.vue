<template>
  <v-container fluid>
    <v-row class="fill-height" justify="center">
      <v-col cols="auto" class="d-flex flex-column">
        <v-spacer style="flex: 1 1 25%;" />
        <slot />
        <v-spacer style="flex: 3 1 75%;" />
      </v-col>
    </v-row>
  </v-container>
</template>