import { createApp } from 'vue'
import { App } from './App'
import { router } from './config/routes.ts'
import '@svgstore';

import { fetchMe, mePromise } from './shared/me/me.tsx';

fetchMe()

router.beforeEach(async (to, from) => {
  if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in')
    || to.path === '/start') {
    return true
  } else {
    const path = await mePromise!.then(
      () => true,
      () => '/sign_in?return_to=' + to.path
    )
    return path
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
