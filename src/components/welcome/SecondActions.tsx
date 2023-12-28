import { defineComponent } from 'vue';
import s from './Actions.module.scss';
import { RouterLink } from 'vue-router';
export const SecondActions = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <RouterLink class={s.fake} to="/start" >跳过</RouterLink>
        <RouterLink to="/welcome/3" >下一页</RouterLink>
        <RouterLink to="/start" >跳过</RouterLink>
      </div>
    )
  }
})