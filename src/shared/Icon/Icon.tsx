import {PropType, defineComponent} from "vue";
import s from "./Icon.module.scss"

interface Props {
  name?:"add" | "mangosteen" | "pig" | "clock" | "chart" | "cloud"
}
export const Icon = defineComponent({
  props:{
    name:{
      type:String as PropType<Props["name"]>
    }
  },
  setup(props, ctx) {
    return () => {
      return (
        <svg class={s.icon}>
         <use xlinkHref={"#" + props.name}></use>
        </svg>
      )
    }
  },
})