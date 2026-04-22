<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<template>
  <v-app>
    <v-main>
      <router-link to="/">Home</router-link>
      <router-view />
    </v-main>
  </v-app>
</template>
<style scoped>
</style>
