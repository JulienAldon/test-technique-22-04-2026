import { createReviews, deleteReviews, getReview, getReviews, updateReviews } from '@/api/reviews'
import type { Review, ReviewDto } from '@/api/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const fetchReviews = async () => {
  const res = await getReviews()
  return res.data
}

export const fetchReview = async (id: number) => {
  const res = await getReview(id)
  return res.data
}

export const createReview = async (data: ReviewDto) => {
  const res = await createReviews(data)
  return res.data
}

export const updateReview = async (id: number, data: ReviewDto) => {
  const res = await updateReviews(id, data)
  return res.data
}

export const deleteReview = async (id: number) => {
  const res = await deleteReviews(id)
  return res.data
}

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  })
}

export const useReview = (id: number) => {
  return useQuery({
    queryKey: ['review', id],
    queryFn: () => fetchReview(id),
    enabled: !!id,
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['movie'] })
    },
  })
}

export const useUpdateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReviewDto }) => updateReview(id, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['review', variables.id] })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}
