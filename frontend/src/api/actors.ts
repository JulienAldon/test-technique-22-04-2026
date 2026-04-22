import api from './api'
import type { MovieDto } from './types'

export const getActors = (params: { page: number }) =>
  api.get(`/actors/${params.page ? `?page=${params.page}` : ''}`)
export const getActor = (id: number) => api.get(`/actors/${id}/`)
export const createActors = (data: MovieDto) => api.post('/actors/', data)
export const updateActors = (id: number, data: MovieDto) => api.put(`/actors/${id}/`, data)
export const deleteActors = (id: number) => api.delete(`/actors/${id}/`)
