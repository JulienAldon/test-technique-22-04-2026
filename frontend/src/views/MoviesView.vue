<script setup lang="ts">
import type { Actor } from '@/api/types'
import ManageModal from '@/components/ManageModal.vue'
import { useActors } from '@/services/actors'
import { useMovies, useCreateMovie } from '@/services/movies'
import { ref } from 'vue'
const page = ref(1)

const { data: movies, isLoading: isMoviesLoading } = useMovies(page)
const { data: actors, isLoading: isActorsLoading } = useActors()

const { mutateAsync: createMovie } = useCreateMovie()

const dialog = ref(false)

const form = ref({
  title: '',
  description: '',
  actors: [] as number[],
})

const submit = async () => {
  await createMovie({
    title: form.value.title,
    description: form.value.description,
    actors: form.value.actors,
  })

  dialog.value = false

  // reset form
  form.value = {
    title: '',
    description: '',
    actors: [],
  }
}
</script>
<template>
  <main>
    <section>
      <v-btn color="primary" @click="dialog = true" variant="outlined">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <ManageModal v-model="dialog" title="Create Movie">
        <v-text-field v-model="form.title" label="Title" />
        <v-textarea v-model="form.description" label="Description" />

        <v-select
          v-model="form.actors"
          :items="actors?.results || []"
          :item-title="(a: Actor) => `${a.first_name} ${a.last_name}`"
          item-value="id"
          label="Actors"
          :loading="isActorsLoading"
          multiple
          chips
        />

        <template #actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="submit">Save</v-btn>
        </template>
      </ManageModal>
    </section>

    <section>
      <div v-if="isMoviesLoading">Loading</div>

      <v-list v-else lines="one">
        <router-link
          v-for="movie in movies?.results || []"
          :key="movie.id"
          :to="`/movies/${movie.id}`"
          style="text-decoration: none; color: inherit"
        >
          <v-list-item
            :title="movie.title"
            :subtitle="movie.description"
          />
        </router-link>
      </v-list>

    <div class="d-flex justify-center mt-4">
      <v-pagination
        v-model="page"
        :length="Math.ceil((movies?.count || 0) / 5)"
        :total-visible="5"
      />
    </div>
    </section>
  </main>
</template>
