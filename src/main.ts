import { useMeStore } from './stores/meStore';
import { createApp } from 'vue'
import { App } from './App'
import { router } from './config/routes'
import '@svgstore';

import { RouteLocationNormalized } from 'vue-router';
import { createPinia } from 'pinia';


const pinia = createPinia()
const app = createApp(App)

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}


app.use(pinia)

const meStore = useMeStore()
meStore.fetchMe()
router.beforeEach(async (to,from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return meStore.mePromise!.then(
    () => true,
    () => '/sign_in?return_to=' + from.path
  )
})

app.use(router)

app.mount('#app')
