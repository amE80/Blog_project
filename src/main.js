import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(VeeValidatePlugin);
app.use(createPinia())
app.use(router)

app.mount('#app')
