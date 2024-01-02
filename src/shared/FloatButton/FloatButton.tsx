import {PropType, defineComponent} from "vue";
import s from "./FloatButton.module.scss"
import { Icon, IconProps } from "../Icon/Icon";
export const FloatButton = defineComponent({
  props:{
    iconName:{
      type:String as PropType<IconProps["name"]>,
      default:"add"
    }
  },
  setup(props, ctx) {
    return () => {
      return (
        <div class={s.wrapper}>
          <Icon name={props.iconName} class={s.icon}></Icon>
        </div>
      )
    }
  },
})