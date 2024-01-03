import {PropType, defineComponent} from "vue";
import s from "./Icon.module.scss"

export interface IconProps {
  name?:"add" | "mangosteen" | "pig" | "clock" | "chart" | "cloud" | "menu"
}
export const Icon = defineComponent({
  props:{
    name:{
      type:String as PropType<IconProps["name"]>,
      require:true
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