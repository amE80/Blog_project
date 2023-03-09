import { createApp,markRaw } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.use(VeeValidatePlugin);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router)
});
app.use(router)
app.use(pinia)

app.mount('#app')
