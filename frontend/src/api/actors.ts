import api from './api'

export const getActors = (params: {page: number}) => api.get(`/actors/${params.page ? `?page=${params.page}` : ''}`)
export const getActor = (id) => api.get(`/actors/${id}/`)
export const createActors = (data) => api.post('/actors/', data)
export const updateActors = (id, data) => api.put(`/actors/${id}/`, data)
export const deleteActors = (id) => api.delete(`/actors/${id}`)