import {PropType, computed, defineComponent, ref} from "vue";
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
    },
    disable:{
      type:Boolean,
      default:false
    },
    selfDisable:{
      type:Boolean,
      default:false
    }
  },
  setup(props, ctx) {
    const timer = ref<number | null>(null)
    const selfDisable = ref(false)
    const _disable = computed(() => {
      if (props.disable) {
        return props.disable
      }else{
        return selfDisable.value
      }
    })

    const onClick = (e:MouseEvent) => {
      props.onClick?.(e)
      if (props.selfDisable) {
        selfDisable.value = true        
      }
      if (timer.value) {return}
      timer.value = setTimeout(() => {
        timer.value = null
        if (props.selfDisable) {
          selfDisable.value = false          
        }
      }, 1500);
    }
    return () => {
      return (
        <div class={s.wrapper}>
          <button disabled={_disable.value} type={props.type} class={[s.button,s[props.level]]} onClick={onClick}>
            {ctx.slots.default?.()}
          </button>
        </div>
      )
    }
  },
})