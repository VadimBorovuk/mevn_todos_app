import axios from 'axios'
const serviceTask = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 600000,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
  }
})

const serviceUser = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 600000,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user_token')
    }
})


export { serviceTask, serviceUser }

