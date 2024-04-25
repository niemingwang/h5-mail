import { createApp } from 'vue'
import './style/index.css'
import App from './App.vue'

import '@vant/touch-emulator';
// import 'vant/lib/index.css';

// router
import router from '@/router/index.ts'

// store
import { createPinia, PiniaVuePlugin } from 'pinia'
const pinia = createPinia()

// directives
import directive from "@/directive";

// lib-flexible 用于设置 rem 基准值，也就是设置font-size。
// import 'amfe-flexible/index.min.js'

const app = createApp(App)
app.use(router)
app.use(PiniaVuePlugin)
app.use(pinia)
app.use(directive)

app.mount('#app')
