import {defineComponent} from "vue";
import s from "./Navbar.module.scss"
export const Navbar = defineComponent({
  setup(_, ctx) {
    return () => {
      return (
        <div class={s.navbar}>
          <span class={s.icon_wrapper}>
            {ctx.slots.icon?.()}
          </span>
          <span class={s.title_wrapper}>
            {ctx.slots.default?.()}
          </span>
        </div>
      )
    }
  },
})