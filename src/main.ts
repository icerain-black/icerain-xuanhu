import { createApp } from 'vue'
import { App } from './App'
import { router } from './config/routes.ts'

const app = createApp(App)
app.use(router)
app.mount('#app')
