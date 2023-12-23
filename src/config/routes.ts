import { createRouter, createWebHashHistory } from "vue-router";
import { App } from "../App";
import { WelcomePage } from "../views/WelcomePage";

const routes = [
  { 
    path: '/', 
    component: App,
    children:[
      {path: 'welcome', component: WelcomePage},
    ]
  },
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})