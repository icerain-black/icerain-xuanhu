import { createApp } from 'vue'
import { App } from './App'
import { router } from './config/routes.ts'
import '@svgstore';

const app = createApp(App)
app.use(router)
app.mount('#app')
