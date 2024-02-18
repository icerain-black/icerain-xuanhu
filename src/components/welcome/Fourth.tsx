import { defineComponent } from 'vue';
import { WelcomeLayout } from './WelcomeLayout';
export const Fourth = defineComponent({
  setup: () => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <svg><use xlinkHref='#cloud'></use></svg>,
          title:() => <h2>云备份<br/>再也不怕数据丢失</h2>,
        }}
      </WelcomeLayout>
    )
  }
})