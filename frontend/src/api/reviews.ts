import api from './api'
import type { ReviewDto } from './types'

export const getReviews = () => api.get('/reviews/')
export const getReview = (id: number) => api.get(`/reviews/${id}/`)
export const createReviews = (data: ReviewDto) => api.post('/reviews/', data)
export const updateReviews = (id: number, data: ReviewDto) => api.put(`/reviews/${id}/`, data)
export const deleteReviews = (id: number) => api.delete(`/reviews/${id}/`)
