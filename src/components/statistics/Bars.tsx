import { defineComponent, PropType } from 'vue';
import s from './Bars.module.scss';
export const Bars = defineComponent({
  props: {
    data: {
      type: Array as PropType<{
        tag: {
          id: number;
          user_id: number;
          name: string;
          kind: "expenses" | "income";
          sign:string
        };
        amount: number;
        percent: number;
    }[]>
    }
  },
  setup: (props) => {
    return () => (
      <div class={s.wrapper}>
        {(props.data && props.data.length > 0)? 
          props.data.map(({ tag, amount, percent }) => {
            return (
              <div class={s.topItem}>
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.bar_wrapper}>
                  <div class={s.bar_text}>
                    <span> {tag.name} - {percent}% </span>
                    <span> ￥{amount} </span>
                  </div>
                  <div class={s.bar}>
                    <div class={s.bar_inner} style={{width: `${percent}%`}}></div>
                  </div>
                </div>
              </div>
            )
          })
          :<div>没有数据</div>
        }
        </div>
    )
  }
})