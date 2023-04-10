import { createApp,markRaw } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import './assets/main.css'

const app = createApp(App)
app.use(VeeValidatePlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(
  Vue3Toasity,
  {});
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});
app.use(router)
app.use(pinia)

app.mount('#app')
