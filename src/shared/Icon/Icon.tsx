import {PropType, defineComponent} from "vue";
import s from "./Icon.module.scss"

export interface IconProps {
  name?:"add" | "mangosteen" | "fox" | "clock" | "chart" | "cloud" | "menu" |'charts' | 'notify' | 'export' | "left" | "date"
}
export const Icon = defineComponent({
  props:{
    name:{
      type:String as PropType<IconProps["name"]>,
      require:true
    },
    onClick:{
      type:Function as PropType<() => void>
    }
  },
  setup(props) {
    return () => {
      return (
        <svg class={s.icon} onClick={props.onClick}>
         <use xlinkHref={"#" + props.name}></use>
        </svg>
      )
    }
  },
})