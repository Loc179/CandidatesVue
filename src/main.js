import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { candidates } from '@/data/candidates';

const app = createApp(App)

app.use(router)

const STORAGE_KEY = 'candidates';

if(!localStorage.getItem(STORAGE_KEY)){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
}

app.mount('#app')
