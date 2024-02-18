import { defineComponent } from 'vue';
import { WelcomeLayout } from './WelcomeLayout';
export const First = defineComponent({
  setup: () => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <svg><use xlinkHref='#pig'></use></svg>,
          title:() => <h2>会挣钱<br/>还要会省钱</h2>,
        }}
      </WelcomeLayout>
    )
  }
})