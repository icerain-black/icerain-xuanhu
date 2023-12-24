import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/welcome/First";
import { Seconed } from "../components/welcome/Seconed"
import { Thire } from "../components/welcome/Thire";
import { Fourth } from "../components/welcome/Fourth";

const routes:RouteRecordRaw[] = [
  { 
    path: '/', 
    redirect:"/welcome"
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
        component:Seconed
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
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})