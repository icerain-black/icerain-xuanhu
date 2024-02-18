import {PropType, defineComponent} from "vue";
import s from "./FloatButton.module.scss"
import { Icon, IconProps } from "../Icon/Icon";
export const FloatButton = defineComponent({
  props:{
    iconName:{
      type:String as PropType<IconProps["name"]>,
      default:"add"
    },
    onClick:Function as PropType<(payload:MouseEvent) => void>
  },
  setup(props) {
    return () => {
      return (
        <div class={s.wrapper} onClick={props.onClick}>
          <Icon name={props.iconName} class={s.icon}></Icon>
        </div>
      )
    }
  },
})