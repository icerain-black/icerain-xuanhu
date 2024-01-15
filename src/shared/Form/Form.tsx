import {PropType, computed, defineComponent} from "vue";
import s from "./Form.module.scss"
import { EmojiSelect } from "../EmojiSelect/EmojiSelect";
export const Form = defineComponent({
  props:{
    onSubmit:{
      type:Function as PropType<(e:SubmitEvent) => void>
    }
  },
  setup(props, ctx) {
    return () => {
      return (
        <form class={s.form} onSubmit={props.onSubmit}>
          {ctx.slots.default?.()}
        </form>
      )
    }
  },
})

export const FormItem = defineComponent({
  props:{
    error:{
      type:String as PropType<string>,
      default:""
    },
    value:{
      type:String as PropType<string>,
    },
    type:{
      type:String as PropType<"text" | "emojiSelect" | undefined>,
    }
  },
  setup(props, ctx) {

    const items = computed(() => {
      switch (props.type) {
        case "text":
          return (
            <label class={s.formLabel}>
            <span class={s.formItem_name}>标签名</span>
            <div class={s.formItem_value}>
              <input
                value={props.value}
                onInput={(e) => ctx.emit("update:value",(e.target as HTMLInputElement)?.value)}
                class={[s.formItem, s.input, props.error && s.error]}
                type="text"
              />
            </div>
            <div class={s.formItem_errorHint}>
              <span>{props.error || "　"}</span>
            </div>
          </label>
          )
        case "emojiSelect":
          return (
            <label class={s.formLabel}>
              <span class={s.formItem_name}>符号 {props.value}</span>
              <div class={s.formItem_value}>
                <EmojiSelect
                  emoji={props.value}
                  updateEmoji={(emoji) => {ctx.emit("update:value",emoji)}}
                  error={props.error ? true : false}
                  class={[s.formItem, s.emojiList]}
                />
              </div>
              <div class={s.formItem_errorHint}>
                <span>{props.error || "　"}</span>
              </div>
            </label>
          )
        case undefined:
          return ctx.slots.default?.()
        default:
          break;
      }
    })
    return () => {
      return (
        <div class={s.formRow}>
          {items.value}
        </div>
      )
    }
  },
})