import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { First } from "../components/welcome/First";
import { Second } from "../components/welcome/Second"
import { Thire } from "../components/welcome/Thire";
import { Fourth } from "../components/welcome/Fourth";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThireActions } from "../components/welcome/ThireActions";
import { FourthActions } from "../components/welcome/FourthActions";
import { ItemList } from '../components/Item/ItemList';
import { ItemCreate } from '../components/Item/ItemCreate';
import { TagCreate } from '../components/tags/TagCreate';
import { TagEdit } from '../components/tags/TagEdit';

const routes:RouteRecordRaw[] = [
  { 
    path: '/', 
    redirect:"/welcome/1"
  },
  {
    path: '/welcome', 
    component:() => import("../views/Welcome"),
    redirect:"/welcome/1",
    beforeEnter(_,__,next){
      localStorage.getItem("skipFeatures") === "yes" ? next("/start") : next()
    },
    children:[
      {
        path:"1",
        components:{
          main:First,
          actions:FirstActions
        },
        name:"Welcome1"
      },
      {
        path:"2",
        components:{
          main:Second,
          actions:SecondActions
        },
        name:"Welcome2"
      },
      {
        path:"3",
        components:{
          main:Thire,
          actions:ThireActions
        },
        name:"Welcome3"
      },
      {
        path:"4",
        components:{
          main:Fourth,
          actions:FourthActions
        },
        name:"Welcome4"
      }
    ]
  },
  {
    path:"/start",
    component:() => import("../views/StartPage")
  },
  {
    path:"/items",
    component:() => import('./../views/ItemPage'),
    children:[
      {
        path:"",
        component:ItemList
      },
      {
        path:"create",
        component:ItemCreate
      }
    ]
  },
  {
    path:"/tags",
    component:() => import('../views/TagPage'),
    children:[
      {
        path:"create",
        component:TagCreate
      },
      {
        path:":id/edit",
        component:TagEdit
      }
    ]
  },
  {
    path:"/sign_in",
    component:() => import('../views/SignInPage')  
  },
  {
    path:"/statistics",
    component:() => import('../views/StatisticsPage')
  },
  {
    path: '/export', component: () => import('../shared/ComingSoon/ComingSoon')
  },
  {
    path: '/notify', component: () => import('../shared/ComingSoon/ComingSoon')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})