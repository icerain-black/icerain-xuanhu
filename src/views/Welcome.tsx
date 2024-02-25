import { Transition, VNode, defineComponent, ref } from "vue";
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from "vue-router";
import s from "./Welcome.module.scss"
import { useSwiper } from "../hooks/useSwiper";

const routerMap:Record<string,string> = {
  "Welcome1":"/welcome/2",
  "Welcome2":"/welcome/3",
  "Welcome3":"/welcome/4",
  "Welcome4":"/start",
} 
export const Welcome = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const ref_main = ref()
    const pushRouter = () => {      
      if (!isSwiping.value && realDirection.value === "left") {
        let name = (route.name || "Welcome1").toString()
        router.replace(routerMap[name])
      }
    }
    let {isSwiping,realDirection} = useSwiper(ref_main,{
      afterEnd:pushRouter
    })
   
    return () => {
      return (
        <div class={s.wrapper}>
          <header>
            <svg>
              <use xlinkHref='#mangosteen'></use>
            </svg>
            <h1>山竹记账</h1>
          </header>
          <main class={s.main} ref={ref_main}>
            <RouterView name="main">
              {({Component:X}:{Component: VNode;route: RouteLocationNormalizedLoaded;}) => (
                <Transition 
                  name="slide-fade" 
                  enterActiveClass={s["slide-fade-enter-active"]}
                  leaveActiveClass={s["slide-fade-leave-active"]}
                  enterFromClass={s["slide-fade-enter-from"]}
                  leaveToClass={s["slide-fade-leave-to"]}
                >
                  {X}
                </Transition>
              )}
            </RouterView>
          </main>
          <footer>
            <RouterView name="actions"/>
          </footer>
        </div>
      )
    }
  },
})

export default Welcome