<script setup lang="ts">
import type { Actor, Movie } from '@/api/types'
import ManageModal from '@/components/ManageModal.vue'
import PaginatedList from '@/components/PaginatedList.vue'
import AppPagination from '@/components/AppPagination.vue'

import { ref } from 'vue'
import { useCrudForm } from '@/hooks/useCrudForm'

import { useActors } from '@/services/actors'
import {
  useMovies,
  useCreateMovie,
  useDeleteMovie,
  useUpdateMovie,
} from '@/services/movies'

const page = ref(1)

const { data: movies, isLoading: isMoviesLoading } = useMovies(page)
const { data: actors, isLoading: isActorsLoading } = useActors(page)

const { mutateAsync: createMovie } = useCreateMovie()
const { mutateAsync: updateMovie } = useUpdateMovie()
const { mutateAsync: deleteMovie } = useDeleteMovie()

const {
  dialog,
  isEditMode,
  editingId,
  form,
  openCreate,
  openEdit,
  reset,
} = useCrudForm({
  title: '',
  description: '',
  actors: [] as number[],
})

const submit = async () => {
  if (isEditMode.value && editingId.value !== null) {
    await updateMovie({
      id: editingId.value,
      data: {
        id: editingId.value,
        title: form.value.title,
        description: form.value.description,
        actor_ids: form.value.actors,
        reviews: [],
      },
    })
  } else {
    await createMovie({
      title: form.value.title,
      description: form.value.description,
      actor_ids: form.value.actors,
    })
  }

  reset()
}

const deleteItem = async (id?: number) => {
  if (!id) return
  await deleteMovie(id)
}

const handleEdit = (movie: Movie) => {
  if (!movie.id) {
    return;
  }
  openEdit(movie.id, {
    title: movie.title,
    description: movie.description,
    actors: movie?.actors?.map((a) => a.id) || [],
  })
}
</script>

<template>
  <main class="movies">
    <h1>Movies</h1>

    <section class="actions">
      <v-btn color="primary" variant="outlined" @click="openCreate">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <ManageModal
        v-model="dialog"
        :title="isEditMode ? 'Edit Movie' : 'Create Movie'"
      >
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
          <v-btn text @click="reset">Cancel</v-btn>
          <v-btn color="primary" @click="submit">Save</v-btn>
        </template>
      </ManageModal>
    </section>

    <section>
      <PaginatedList
        :items="movies?.results || []"
        :loading="isMoviesLoading"
        item-key="id"
      >
        <template #item="{ item }">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.description }}
          </v-list-item-subtitle>
        </template>

        <template #actions="{ item }">
          <v-btn color="primary" @click="handleEdit(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn color="error" @click="deleteItem(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </PaginatedList>

      <AppPagination
        v-model:page="page"
        :total="movies?.count || 0"
        :per-page="5"
      />
    </section>
  </main>
</template>

<style scoped>
.movies {
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  width: 80vw;
}

.actions {
  margin-bottom: 1rem;
}
</style>