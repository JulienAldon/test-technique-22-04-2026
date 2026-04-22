<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<template>
  <v-app>
    <v-main>
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/actors">Actors</router-link>
      <router-view />
    </v-main>
  </v-app>
</template>
<style scoped>
.link {
  color: inherit;
  margin-right: 1rem;
}
</style>
