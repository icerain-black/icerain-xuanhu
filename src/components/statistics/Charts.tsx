import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import s from './Charts.module.scss';
import { FormItem } from '../../shared/Form/Form';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { http } from '../../shared/http/http';
import { Time } from '../../shared/time/time';

const DAY = 24 * 60 * 60 * 1000

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
      if (!props.startDate || !props.endDate) {return []}
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const dayTime = diff / DAY + 1

      const arr = Array.from({length:dayTime}).map((_,i) => {
        const timeStamp = new Time(props.startDate).add(i,"day").getTimeStamp()
        const item = lineChartData_before.value[lineChartData_before.value.length - 1]
        const itemStamp = new Date(item?.happen_at).getTime()
        return timeStamp === itemStamp 
          ? [new Date(timeStamp).toISOString(),lineChartData_before.value.pop()?.amount]
          : [new Date(timeStamp).toISOString(),0]
      })
      
      return arr as [string,number][]
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