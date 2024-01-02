import {defineComponent} from "vue";
import s from "./FloatButton.module.scss"
import { Icon } from "../Icon/Icon";
export const FloatButton = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <div class={s.wrapper}>
          <Icon name="add" class={s.icon}></Icon>
        </div>
      )
    }
  },
})