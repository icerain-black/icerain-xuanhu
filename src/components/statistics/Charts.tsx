import { defineComponent, PropType, ref } from 'vue';
import s from './Charts.module.scss';
import { FormItem } from '../../shared/Form/Form';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    }
  },
  setup: (props, context) => {
    const category = ref('expenses')
    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type="select" options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model:value={category.value} />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    )
  }
})