<script setup lang="ts">
import type { Actor } from '@/api/types'
import ManageModal from '@/components/ManageModal.vue'
import PaginatedList from '@/components/PaginatedList.vue'
import AppPagination from '@/components/AppPagination.vue'

import { useActors, useCreateActor, useUpdateActor, useDeleteActor } from '@/services/actors'

import { ref } from 'vue'
import { useCrudForm } from '@/hooks/useCrudForm'

const page = ref(1)

const { data: actors, isLoading } = useActors(page)
const { mutateAsync: createActor } = useCreateActor()
const { mutateAsync: updateActor } = useUpdateActor()
const { mutateAsync: deleteActor } = useDeleteActor()

const {
  dialog,
  isEditMode,
  editingId,
  form,
  openCreate,
  openEdit,
  reset,
} = useCrudForm({
  first_name: '',
  last_name: '',
})

const submit = async () => {
  if (isEditMode.value && editingId.value !== null) {
    await updateActor({
      id: editingId.value,
      data: {
        id: editingId.value,
        ...form.value,
      },
    })
  } else {
    await createActor(form.value)
  }

  reset()
}

const deleteItem = async (id: number) => {
  await deleteActor(id)
}

const handleEdit = (actor: Actor) => {
  openEdit(actor.id, {
    first_name: actor.first_name,
    last_name: actor.last_name,
  })
}
</script>

<template>
  <main class="actors">
    <h1>Actors</h1>

    <section class="actions">
      <v-btn color="primary" variant="outlined" @click="openCreate">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <ManageModal
        v-model="dialog"
        :title="isEditMode ? 'Edit Actor' : 'Create Actor'"
      >
        <v-text-field v-model="form.first_name" label="First Name" />
        <v-text-field v-model="form.last_name" label="Last Name" />

        <template #actions>
          <v-spacer />
          <v-btn text @click="reset">Cancel</v-btn>
          <v-btn color="primary" @click="submit">Save</v-btn>
        </template>
      </ManageModal>
    </section>

    <section>
      <PaginatedList
        :items="actors?.results || []"
        :loading="isLoading"
        item-key="id"
      >
        <template #item="{ item }">
          <v-list-item-title>
            {{ item.first_name }} {{ item.last_name }}
          </v-list-item-title>
        </template>

        <!-- actions -->
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
        :total="actors?.count || 0"
        :per-page="5"
      />
    </section>
  </main>
</template>

<style scoped>
.actors {
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