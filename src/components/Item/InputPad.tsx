import { defineComponent, ref } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon/Icon";
import { time } from "../../shared/time/time";
import { DatetimePicker,Popup } from 'vant';
export const InputPad = defineComponent({
  setup(props, ctx) {
    const buttons = [
      { text: "1", onClick: () => {} },
      { text: "2", onClick: () => {} },
      { text: "3", onClick: () => {} },
      { text: "清空", onClick: () => {} },
      { text: "4", onClick: () => {} },
      { text: "5", onClick: () => {} },
      { text: "6", onClick: () => {} },
      { text: "+", onClick: () => {} },
      { text: "7", onClick: () => {} },
      { text: "8", onClick: () => {} },
      { text: "9", onClick: () => {} },
      { text: "-", onClick: () => {} },
      { text: ".", onClick: () => {} },
      { text: "0", onClick: () => {} },
      { text: "删", onClick: () => {} },
      { text: "提交", onClick: () => {} },
    ];
    const ref_time = ref(new Date())
    const ref_show = ref(false)

    const dateConfirm = (date:Date) =>{
      ref_time.value = date
      dateCancel()
    }
    const dateCancel = () => ref_show.value = false
    const showDate = () => {
      ref_show.value = true
    }
    return () => {
      return (
        <>
          <div class={s.info}>
            <span class={s.date}>
              <Icon name="date" class={s.icon}></Icon>
              <span onClick={showDate}>{time(ref_time.value).format()}</span>
              <Popup position="bottom"  v-model:show={ref_show.value}>
                <DatetimePicker
                  onConfirm={dateConfirm}
                  onCancel={dateCancel}
                  value={ref_time.value}
                  type="date"
                  title="选择年月日"
                />
              </Popup>
            </span>
            <span class={s.amount}>0</span>
          </div>
          <div class={s.buttons}>
            {buttons.map((item) => (
              <button onClick={item.onClick}>{item.text}</button>
            ))}
          </div>
        </>
      );
    };
  },
});
