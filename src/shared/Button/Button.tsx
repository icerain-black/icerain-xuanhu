import {PropType, defineComponent} from "vue";
import s from "./Button.module.scss"

export const Button = defineComponent({
  props:{
    onClick:{
      type:Function as PropType<(e:MouseEvent) => void>
    },
    level:{
      type:String as PropType<"normal" | "danger">,
      default:"normal"
    },
    type:{
      type:String as PropType<"submit" | "button">
    }
  },
  setup(props, ctx) {
    return () => {
      return (
        <div class={s.wrapper}>
          <button type={props.type} class={[s.button,s[props.level]]} onClick={props.onClick}>
            {ctx.slots.default?.()}
          </button>
        </div>
      )
    }
  },
})