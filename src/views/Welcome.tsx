import { Transition, VNode, defineComponent, ref } from "vue";
import { RouteLocationNormalizedLoaded, RouterView } from "vue-router";
import s from "./Welcome.module.scss"
import { useSwiper } from "../hooks/useSwiper";
export const Welcome = defineComponent({
  setup() {
    const ref_main = ref()
    useSwiper(ref_main)
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
              {({Component:X,route:R}:{Component: VNode;route: RouteLocationNormalizedLoaded;}) => (
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