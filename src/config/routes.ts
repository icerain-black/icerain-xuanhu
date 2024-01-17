import { ItemPage } from './../views/ItemPage';
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
import { StartPage } from "../views/StartPage";
import { ItemList } from '../components/Item/ItemList';
import { ItemCreate } from '../components/Item/ItemCreate';
import { TagPage } from '../views/TagPage';
import { TagCreate } from '../components/tags/TagCreate';
import { TagEdit } from '../components/tags/TagEdit';
import { SignInPage } from '../views/SignInPage';
import { StatisticsPage } from '../views/StatisticsPage';

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
    component:StartPage
  },
  {
    path:"/items",
    component:ItemPage,
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
    component:TagPage,
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
    component:SignInPage  
  },
  {
    path:"/statistics",
    component:StatisticsPage
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})