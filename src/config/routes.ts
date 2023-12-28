import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { Welcome } from "../views/Welcome";
import { First } from "../components/welcome/First";
import { Second } from "../components/welcome/Second"
import { Thire } from "../components/welcome/Thire";
import { Fourth } from "../components/welcome/Fourth";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThireActions } from "../components/welcome/ThireActions";
import { FourthActions } from "../components/welcome/FourthActions";

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
        components:{
          main:First,
          actions:FirstActions
        }
      },
      {
        path:"2",
        components:{
          main:Second,
          actions:SecondActions
        }
      },
      {
        path:"3",
        components:{
          main:Thire,
          actions:ThireActions
        }
      },
      {
        path:"4",
        components:{
          main:Fourth,
          actions:FourthActions
        }
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