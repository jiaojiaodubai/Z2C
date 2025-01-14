<template>
  <v-container
    fluid
    class="d-flex"
    style="min-height: 100%;"
  >
    <v-row
      justify="center"
    >
      <v-col
        cols="auto"
        class="d-flex flex-column"
      >
        <v-spacer style="flex: 1 1 25%;" />
        <router-view />
        <v-spacer style="flex: 3 1 75%;" />
      </v-col>
    </v-row>
  </v-container>
</template>