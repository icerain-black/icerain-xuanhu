import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/welcome/First";
import { Second } from "../components/welcome/Second"
import { Thire } from "../components/welcome/Thire";
import { Fourth } from "../components/welcome/Fourth";

const routes:RouteRecordRaw[] = [
  { 
    path: '/', 
    redirect:"/welcome/1"
  },
  {
    path: '/welcome', 
    component:Welcome,
    redirect:"/welcome/1",
    children:[
      {
        path:"1",
        component:First
      },
      {
        path:"2",
        component:Second
      },
      {
        path:"3",
        component:Thire
      },
      {
        path:"4",
        component:Fourth
      }
    ]
  },
  {
    path:"/start",
    redirect:"/welcome/1"
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})