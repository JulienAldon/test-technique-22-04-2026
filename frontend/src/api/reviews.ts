import api from './api'

export const getReviews = () => api.get('/reviews/')
export const getReview = (id) => api.get(`/reviews/${id}/`)
export const createReviews = (data) => api.post('/reviews/', data)
export const updateReviews = (id, data) => api.put(`/reviews/${id}/`, data)
export const deleteReviews = (id) => api.delete(`/reviews/${id}`)
