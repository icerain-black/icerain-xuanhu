import {PropType, defineComponent} from "vue";
import s from "./Center.module.scss"
export const Center = defineComponent({
  props:{
    direction:{
      type:String as PropType<"|" | "-" | "horizontal" | "vertical">,
      default:"horizontal"
    }
  },
  setup(props, ctx) {
    let directionMap = {
      "|":"horizontal",
      "-":"vertical",
      horizontal:"horizontal",
      vertical:"vertical",
    }
    const extraClass = directionMap[props.direction]
    return () => {
      return (
        <div class={[s.center_wrapper,extraClass]}>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})