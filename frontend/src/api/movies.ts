import api from './api'

export const getMovies = (params: { page: number }) =>
  api.get(`/movies/${params.page ? `?page=${params.page}` : ''}`)
export const getMovie = (id) => api.get(`/movies/${id}/`)
export const createMovies = (data) => api.post('/movies/', data)
export const updateMovies = (id, data) => api.put(`/movies/${id}/`, data)
export const deleteMovies = (id) => api.delete(`/movies/${id}/`)
