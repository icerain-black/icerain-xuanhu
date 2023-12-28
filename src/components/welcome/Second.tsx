import { defineComponent } from 'vue';
import clock from '../../assets/icons/clock.svg';
import { WelcomeLayout } from './WelcomeLayout';
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <svg><use xlinkHref='#clock'></use></svg>,
          title:() => <h2>每日提醒<br/>不遗漏每一笔账单</h2>,
        }}
      </WelcomeLayout>
    )
  }
})