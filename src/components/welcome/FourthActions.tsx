import { defineComponent } from 'vue';
import s from './Actions.module.scss';
import { RouterLink } from 'vue-router';
export const FourthActions = defineComponent({
  setup: () => {
    return () => (
      <div class={s.wrapper}>
        <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
        <RouterLink to="/start" >开始记账</RouterLink>
        <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
      </div>
    )
  }
})