import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import s from './Charts.module.scss';
import { FormItem } from '../../shared/Form/Form';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { http } from '../../shared/http/http';
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
    const kind = ref('expenses')

    const lineChartData_before = ref<LineChartData["groups"]>([])
    const lineChartData = computed(() => {
      return lineChartData_before.value?.map((item) => {
        return [item.happen_at,item.amount] as [string,number]
      })
    })

    onMounted(async () => {
      const res = await http.get<LineChartData>("/items/summary",{
        happened_after:props.startDate,
        happened_before:props.endDate,
        kind:kind.value,
        group_by:"happen_at"
      })

      lineChartData_before.value = res.data.groups
    })
    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type="select" options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model:value={kind.value} />
        <LineChart data={lineChartData.value} />
        <PieChart />
        <Bars />
      </div>
    )
  }
})