<script setup lang="ts">
import ManageModal from '@/components/ManageModal.vue'
import { useMovie } from '@/services/movies'
import { useCreateReview } from '@/services/reviews'
import { computed } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const dialog = ref(false)

const route = useRoute()
const id = route.params.id
const { data: movie, isLoading: isMoviesLoading } = useMovie(Number(id));

const { mutateAsync: createReview } = useCreateReview()
const createRating = ref(0)

const rating = computed(() => {
  const reviews = movie.value?.reviews || []

  return reviews.length
    ? reviews.reduce((acc, r) => acc + r.grade, 0) / reviews.length
    : 0
})

const submit = async () => {
  await createReview({
    movie: route.params.id,
    grade: createRating.value,
  })

  dialog.value = false
  createRating.value = 0;
}
</script>
<template>
  <main>
    <section v-if="!isMoviesLoading">
      <div class="titleBox">
        <h1>{{ movie.title }}</h1>
        <div style="display: flex">
          <v-rating
            :model-value="rating"
            readonly
            active-color="warning"
            density="compact"
            color="amber"
          />
          <p>({{ movie.reviews.length }} reviews)</p>
        </div>
      </div>
      <div>
          <h2>Description</h2>
          <p>{{ movie.description }}</p>
      </div>
      <div>
        <h2>Actors</h2>
        <v-list>
            <v-list-item
                v-for="actor in movie.actors || []"
                :key="actor.id"
            >
        <v-list-item-title>
            {{ `${actor.first_name} ${actor.last_name}` }}
          </v-list-item-title>
            </v-list-item>
        </v-list>
      </div>
      <v-btn color="primary" @click="dialog = true" variant="outlined">Rate the movie</v-btn>
    </section>
    <div v-else>
      <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
  </main>
  <ManageModal v-model="dialog" title="Rate Movie">
    <v-rating
        hover
        :length="5"
        :size="32"
        v-model="createRating"
        active-color="warning"
        color="primary"
    >
    </v-rating>
    <template #actions>
      <v-spacer />
      <v-btn text @click="dialog = false">Cancel</v-btn>
      <v-btn color="primary" @click="submit">Save</v-btn>
    </template>
  </ManageModal>
</template>
<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
section {
  width: 50vw;
}
.titleBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 500px) {
  section {
    width: 100vw;
  }
  .titleBox {
    flex-direction: column;
  }
}
</style>
