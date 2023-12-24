import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import s from "./Welcome.module.scss"
import mangosteem from "../assets/icons/mangosteen.svg"
export const Welcome = defineComponent({
  setup() {
    return () => {
      return (
        <div class={s.wrapper}>
          <header>
            <img src={mangosteem}/>
            <h1>山竹记账</h1>
          </header>
          <main class={s.main}>
            <RouterView/>
          </main>
          <footer></footer>
        </div>
      )
    }
  },
})