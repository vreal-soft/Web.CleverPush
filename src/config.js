import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
})

// here you can define constant's for project or inintial configuration for packages
