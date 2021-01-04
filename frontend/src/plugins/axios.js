import axios from 'axios'

export const axiosBase = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://mo-yo-ri.com/'
      : 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})
