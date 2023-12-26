import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
export const WelcomeLayout = defineComponent({
  setup: (props, context) => {
    let {slots} = context
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {slots.icon?.()}
          {slots.title?.()}
        </div>
        <div class={s.actions}>
          {slots.default?.()}
        </div>
      </div>
    )
  }
})