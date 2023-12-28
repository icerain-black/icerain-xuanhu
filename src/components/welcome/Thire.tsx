import { defineComponent } from 'vue';
import chart from '../../assets/icons/chart.svg';
import { WelcomeLayout } from './WelcomeLayout';
export const Thire = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon:() => <img src={chart}/>,
          title:() => <h2>数据可视化<br/>收支一目了然</h2>
        }}
      </WelcomeLayout>
    )
  }
})