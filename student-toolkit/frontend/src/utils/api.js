import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/token', new URLSearchParams({ username: email, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => res.data),
  
  register: (userData) => 
    api.post('/auth/register', userData).then(res => res.data),
  
  googleLogin: (token) => 
    api.post('/auth/google', { token }).then(res => res.data),
  
  getMe: () => 
    api.get('/auth/me').then(res => res.data)
}

export const syllabusAPI = {
  getAll: () => 
    api.get('/syllabus').then(res => res.data),
  
  get: (id) => 
    api.get(`/syllabus/${id}`).then(res => res.data),
  
  create: (syllabus) => 
    api.post('/syllabus', syllabus).then(res => res.data),
  
  update: (id, syllabus) => 
    api.put(`/syllabus/${id}`, syllabus).then(res => res.data),
  
  delete: (id) => 
    api.delete(`/syllabus/${id}`).then(res => res.data)
}

export const materialsAPI = {
  getAll: () => 
    api.get('/materials').then(res => res.data),
  
  get: (id) => 
    api.get(`/materials/${id}`).then(res => res.data),
  
  upload: (formData) => 
    api.post('/materials', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data),
  
  delete: (id) => 
    api.delete(`/materials/${id}`).then(res => res.data)
}

export const scheduleAPI = {
  getAll: () => 
    api.get('/schedule').then(res => res.data),
  
  get: (id) => 
    api.get(`/schedule/${id}`).then(res => res.data),
  
  generate: (request) => 
    api.post('/schedule/generate', request).then(res => res.data),
  
  markComplete: (id, completed) => 
    api.put(`/schedule/item/${id}/complete`, { completed }).then(res => res.data)
}

export default api