import axios from 'axios'
import qs from 'qs'

export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  paramsSerializer: params => {
    return qs.stringify(params)
  },
  validateStatus: function() {
    return true
  },
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
