import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/main.scss'
import './assets/rem/rem'

const app = createApp(App)

import Vant from 'vant';
import 'vant/lib/index.css';
app.use(Vant)


app.use(store).use(router).mount('#app')
