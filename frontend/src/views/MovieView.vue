<script setup lang="ts">
import { Movie } from '@/api/types';
import { fetchMovie } from '@/services/movies';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const movie = ref<Movie | null>(null);
const route = useRoute();
onMounted(async () => {
    const id = route.params.id;
    const data = await fetchMovie(id);
    movie.value = data;
});
</script>
<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.description }}</p>
  </div>

  <div v-else>
    Loading...
  </div>
</template>