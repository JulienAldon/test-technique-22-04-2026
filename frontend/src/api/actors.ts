import api from './api'
import type { ActorDto } from './types'

export const getActors = (params: { page: number }) =>
  api.get(`/actors/${params.page ? `?page=${params.page}` : ''}`)
export const getActor = (id: number) => api.get(`/actors/${id}/`)
export const createActors = (data: ActorDto) => api.post('/actors/', data)
export const updateActors = (id: number, data: ActorDto) => api.put(`/actors/${id}/`, data)
export const deleteActors = (id: number) => api.delete(`/actors/${id}/`)
