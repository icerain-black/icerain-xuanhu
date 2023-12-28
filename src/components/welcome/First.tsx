import { defineComponent } from 'vue';
import pig from '../../assets/icons/pig.svg';
import { WelcomeLayout } from './WelcomeLayout';
export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <img src={pig} />,
          title:() => <h2>会挣钱<br/>还要会省钱</h2>,
        }}
      </WelcomeLayout>
    )
  }
})