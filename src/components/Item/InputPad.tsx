import { defineComponent } from "vue";
import s from "./InputPad.module.scss";
import { Icon } from "../../shared/Icon/Icon";
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
    return () => {
      return (
        <>
          <div class={s.info}>
            <span class={s.date}>
              <Icon name="date" class={s.icon}></Icon>
              <span>2020-10-10</span>
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
