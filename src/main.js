// 引入 Tailwind CSS
import '@/assets/tailwind.css'
// 引入 Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'

import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus);

app.mount('#app')
