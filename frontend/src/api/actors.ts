import api from './api'

export const getActors = () => api.get('/actors/')
export const getActor = (id) => api.get(`/actors/${id}/`)
export const createActors = (data) => api.post('/actors/', data)
export const updateActors = (id, data) => api.put(`/actors/${id}/`, data)
export const deleteActors = (id) => api.delete(`/actors/${id}`)