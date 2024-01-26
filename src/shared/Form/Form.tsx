import {PropType, computed, defineComponent, ref} from "vue";
import s from "./Form.module.scss"
import { EmojiSelect } from "../EmojiSelect/EmojiSelect";
import { DatetimePicker, Popup } from "vant";
import { Time } from "../time/time";
import { Button } from "../Button/Button";
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
      type:String as PropType<"text" | "emojiSelect" | undefined | "date" | "validationCode" | 'select'>,
    },
    label:{
      type:String
    },
    placeholder:{
      type:String
    },
    options: Array as PropType<Array<{ value: string, text: string }>>,
    onClick:{
      type:Function as PropType<() => void>
    },
    countFrom:{
      type:Number as PropType<number>,
      default:60
    },
    buttonSelfDisable:{
      type:Boolean,
    }
  },
  setup(props, ctx) {
    const timer = ref<number>();
    const countTime = ref<number>(props.countFrom)

    const startCount = () => {
      timer.value = setInterval(() => {
        countTime.value -= 1
        if (countTime.value === 0) {
          clearInterval(timer.value)
          timer.value = undefined
          countTime.value = props.countFrom
        }
      }, 1000);
    }

    ctx.expose({
      startCount
    })

    const refDateVisible = ref(false)
    const items = computed(() => {
      switch (props.type) {
        case "text":
          return (
            <>
              <div class={s.formItem_value}>
                <input
                  value={props.value}
                  onInput={(e) => ctx.emit("update:value",(e.target as HTMLInputElement)?.value)}
                  class={[s.formItem, s.input, props.error && s.error]}
                  type="text"
                  placeholder={props.placeholder}
                />
              </div>
              <div class={s.formItem_errorHint}>
                <span>{props.error || "　"}</span>
              </div>
            </>
          )
        case "emojiSelect":
          return (
            <>
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
            </>
          )

        case "date":
          return (
            <div class={s.formItem_value}>
              <input readonly={true} value={props.value}
              placeholder={props.placeholder}
              onClick={() => { refDateVisible.value = true }}
              class={[s.formItem, s.input]} />
              <Popup position='bottom' v-model:show={refDateVisible.value}>
                <DatetimePicker value={props.value} type="date" title="选择年月日"
                  onConfirm={(date: Date) => {
                    ctx.emit('update:value', new Time(date).format())
                    refDateVisible.value = false
                  }}
                  onCancel={() => refDateVisible.value = false} />
              </Popup>
            </div>
          )

        case "validationCode":
          return <>
            <div class={s.formItem_value}>
              <input type="text" 
                value={props.value}
                placeholder={props.placeholder}
                onInput={(e) => ctx.emit("update:value",(e.target as HTMLInputElement)?.value)} 
                class={[s.formItem, s.input, props.error && s.error,s.validationInput]}
              />
              <Button 
                type="button" 
                onClick={props.onClick} 
                class={[s.formItem, s.button, props.error && s.error,s.validationButton]}
                disable={!!timer.value}
                selfDisable={props.buttonSelfDisable}
              >
                {timer.value ? `${countTime.value}s后可再次发送` : "发送验证码"}
              </Button>
            </div>
            <div class={s.formItem_errorHint}>
              <span>{props.error || "　"}</span>
            </div>
          </>
        case 'select':
          return (
            <select class={[s.formItem, s.select]} value={props.value}
                onChange={(e: any) => { ctx.emit('update:value', e.target.value) }}>
                {props.options?.map(option =>
                  <option value={option.value}>{option.text}</option>
                )}
              </select>)            
        case undefined:
          return ctx.slots.default?.()
        default:
          break;
      }
    })

    return () => {
      return (
        <div class={s.formRow}>
          <label class={s.formLabel}>
            {props.label && <span class={s.formItem_name}>{props.label}</span>}
            {items.value}
          </label>
        </div>
      )
    }
  },
})