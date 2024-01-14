import {defineComponent, reactive, ref} from "vue";
import s from "./ItemList.module.scss"
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { ItemSummary } from "./ItemSummary";
import { Time } from "../../shared/time/time";
export const ItemList = defineComponent({
  setup(props, ctx) {
    const customTime = reactive({
      start:new Time(),
      end:new Time()
    })

    const time = new Time()

    const itemTimeList = [
      {start:time.getFirstDayOfMonth(),end:time.getLastDayOfMonth()},
      {start:time.add(-1,"month").getFirstDayOfMonth(),end:time.add(-1,"month").getLastDayOfMonth()},
      {start:time.getFirstDayOfYear(),end:time.getLastDayOfYear()},
    ]

    return () => {
      const ref_selected = ref("本月")
      return (
        <MainLayout>{
          {
            title:() => "山竹记账",
            icon:() => <Icon name="menu"></Icon>,
            default:() => (
              <Tabs v-model:selected={ref_selected.value}>
                <Tab kind="本月">
                  <ItemSummary startDate={itemTimeList[0].start.format()} endDate={itemTimeList[0].end.format()}/>
                </Tab>
                <Tab kind="上月">
                  <ItemSummary startDate={itemTimeList[1].start.format()} endDate={itemTimeList[1].end.format()}/>
                </Tab>
                <Tab kind="今年">
                  <ItemSummary startDate={itemTimeList[2].start.format()} endDate={itemTimeList[2].end.format()}/>
                </Tab>
                <Tab kind="自定义时间">
                  <ItemSummary startDate={customTime.start.format()} endDate={customTime.end.format()}/>
                </Tab>
              </Tabs>
            )
          }  
        }</MainLayout>
      )
    }
  },
})