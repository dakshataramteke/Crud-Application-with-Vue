import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue';
import router from '../routes/route.ts';
import axios from 'axios';

axios.interceptors.request.use(config =>{
    axios.defaults.baseURL = 'http://localhost:3000/';
    return config;
})
const app =createApp(App)
app.use(router);
app.mount('#app')
