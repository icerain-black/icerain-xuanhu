import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './Charts.module.scss';
import { FormItem } from '../../shared/Form/Form';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { http } from '../../shared/http/http';
import { Time } from '../../shared/time/time';
import { useUserKindStore } from '../../stores/userKindStore';

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
  setup: (props) => {
    const userKindStore = useUserKindStore()
    const kind = ref(userKindStore.chartKind)

    const lineChartData_before = ref<StatisticsResData<LineChartResData>["groups"]>([])
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

    const fetchLineChartData = async() => {
      const res = await http.get<StatisticsResData<LineChartResData>>("/items/summary",{
        happened_after:props.startDate,
        happened_before:props.endDate,
        kind:kind.value,
        group_by:"happen_at"
      },{_loading:true})
      
      lineChartData_before.value = res.data.groups
    }

    const pieChartData_before = ref<StatisticsResData<PieChartResData>>()
    const pieChartData = computed(() => 
      pieChartData_before.value?.groups.map(item => {
        return {value:item.amount,name:item.tag.name}
      })
    )

    const barChartData = computed(() => {
      let total = pieChartData_before.value?.total
      return pieChartData_before.value?.groups.map(itme =>({
          tag:itme.tag,
          amount:itme.amount / 100,
          percent:total ? Math.round(itme.amount / total * 100) : 0
      }))
    })

    const fetchPieChartData = async() => {
      const res = await http.get<StatisticsResData<PieChartResData>>("/items/summary",{
        happened_after:props.startDate,
        happened_before:props.endDate,
        kind:kind.value,
        group_by:"tag_id"
      })

      pieChartData_before.value = res.data
    }
    onMounted(() => {
      fetchLineChartData()
      fetchPieChartData()
    })
    watch(() => [kind.value,props.startDate,props.endDate],() => {
      userKindStore.changeChartKind(kind.value)
      fetchLineChartData()
      fetchPieChartData()
    })

    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type="select" options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model:value={kind.value} />
        <LineChart data={lineChartData.value} />
        <PieChart data={pieChartData.value}/>
        <Bars data={barChartData.value}/>
      </div>
    )
  }
})