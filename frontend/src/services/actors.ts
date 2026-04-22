import { createActors, deleteActors, getActor, getActors, updateActors } from '@/api/actors'
import type { Actor, Actors } from '@/api/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'

export const fetchActors = async (page = 1): Promise<Actors> => {
  const res = await getActors({ page })
  return res.data
}

export const fetchActor = async (id: number): Promise<Actor> => {
  const res = await getActor(id)
  return res.data
}

export const createActor = async (data: Actor): Promise<Actor> => {
  const res = await createActors(data)
  return res.data
}

export const updateActor = async (id: number, data: Actor): Promise<Actor> => {
  const res = await updateActors(id, data)
  return res.data
}

export const deleteActor = async (id: number) => {
  const res = await deleteActors(id)
  return res.data
}

export const useActors = (page: Ref<number>) => {
  return useQuery({
    queryKey: computed(() => ['actors', page.value]),
    queryFn: () => fetchActors(page.value),
  })
}

export const useActor = (id: number) => {
  return useQuery({
    queryKey: ['actor', id],
    queryFn: () => fetchActor(id),
    enabled: !!id,
  })
}

export const useCreateActor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createActor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] })
    },
  })
}

export const useUpdateActor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Actor }) => updateActor(id, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['actors'] })
      queryClient.invalidateQueries({ queryKey: ['actor', variables.id] })
    },
  })
}

export const useDeleteActor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteActor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actors'] })
    },
  })
}
