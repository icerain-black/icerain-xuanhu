import { PropType, defineComponent, ref } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon/Icon";
import { Time } from "../../shared/time/time";
import { DatetimePicker,Popup } from 'vant';
export const InputPad = defineComponent({
  props:{
    happenAt:{
      type:String,
      require:true
    },
    amount:{
      type:Number,
      require:true
    },
    onSumit:{
      type:Function as PropType<() => void>
    }
  },
  emits:["update:happenAt","update:amount"],
  setup(props, ctx) {
    const buttons = [
      { text: "1", onClick: () => {appendNumber("1")} },
      { text: "2", onClick: () => {appendNumber("2")} },
      { text: "3", onClick: () => {appendNumber("3")} },
      { text: "4", onClick: () => {appendNumber("4")} },
      { text: "5", onClick: () => {appendNumber("5")} },
      { text: "6", onClick: () => {appendNumber("6")} },
      { text: "7", onClick: () => {appendNumber("7")} },
      { text: "8", onClick: () => {appendNumber("8")} },
      { text: "9", onClick: () => {appendNumber("9")} },
      { text: ".", onClick: () => {appendNumber(".")} },
      { text: "0", onClick: () => {appendNumber("0")} },
      { text: "清空", onClick: () => {ctx.emit("update:amount",0);ref_amount.value = "0"} },
      { text: "提交", onClick: () => {
        ctx.emit("update:amount",parseFloat(ref_amount.value) * 100)
        props.onSumit?.()
      }},
    ];

    const appendNumber = (n:string|number) => {
      let value = n.toString()
      let pointIndex = ref_amount.value.indexOf(".")

      if (ref_amount.value.length >= 13) {
        return
      }

      if (pointIndex >= 0 && ref_amount.value.length - pointIndex > 2) {
        return
      }

      if (value === ".") {
        if (pointIndex >= 0) {
          return
        }
      }

      if (ref_amount.value === "0") {
        if (value === "0") {
          return
        }
        if (value !== ".") {
          ref_amount.value = ""
        }
      }

      ref_amount.value += value
    }
    const ref_show = ref(false)
    const ref_amount = ref(props.amount ? (props.amount / 100).toString() : '0')

    const dateConfirm = (date:Date) =>{
      ctx.emit("update:happenAt",date.toISOString())
      dateCancel()
    }
    const dateCancel = () => ref_show.value = false
    const showDate = () => {
      ref_show.value = true
    }
    return () => {
      return (
        <div>
          <div class={s.info}>
            <span class={s.date}>
              <Icon name="date" class={s.icon}></Icon>
              <span onClick={showDate}>{new Time(props.happenAt).format()}</span>
              <Popup position="bottom"  v-model:show={ref_show.value}>
                <DatetimePicker
                  onConfirm={dateConfirm}
                  onCancel={dateCancel}
                  value={props.happenAt}
                  type="date"
                  title="选择年月日"
                />
              </Popup>
            </span>
            <span class={s.amount}>{ref_amount.value}</span>
          </div>
          <div class={s.buttons}>
            {buttons.map((item) => (
              <button onClick={item.onClick}>{item.text}</button>
            ))}
          </div>
        </div>
      );
    };
  },
});
