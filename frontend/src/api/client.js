import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8000' })
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
export default API
