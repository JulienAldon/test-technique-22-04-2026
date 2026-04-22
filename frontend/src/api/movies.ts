import api from './api'
import type { MovieDto } from './types'

export const getMovies = (params: { page: number }) =>
  api.get(`/movies/${params.page ? `?page=${params.page}` : ''}`)
export const getMovie = (id: number) => api.get(`/movies/${id}/`)
export const createMovies = (data: MovieDto) => api.post('/movies/', data)
export const updateMovies = (id: number, data: MovieDto) => api.put(`/movies/${id}/`, data)
export const deleteMovies = (id: number) => api.delete(`/movies/${id}/`)
