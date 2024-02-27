import {defineComponent, reactive, ref, watchEffect} from "vue";
import s from "./StatisticsPage.module.scss"
import { Time } from "../shared/time/time";
import { Tab, Tabs } from "../shared/Tabs/Tabs";
import { MainLayout } from "../shared/MainLayout/MainLayout";
import { OverlayIcon } from "../shared/OverLay/Overlay";
import { Overlay } from "vant";
import { Form, FormItem } from "../shared/Form/Form";
import { Button } from "../shared/Button/Button";
import { Charts } from "../components/statistics/Charts";
import { FloatButton } from "../shared/FloatButton/FloatButton";
import { useRouter } from "vue-router";
export const StatisticsPage = defineComponent({
  setup() {
    const router = useRouter()
    const customTime = reactive({
      start:new Time().format(),
      end:new Time().format()
    })

    const temp_customTime = reactive({
      start:new Time().format(),
      end:new Time().format()
    })

    const time = new Time()

    const itemTimeList = [
      {start:time.getFirstDayOfMonth(),end:time.getLastDayOfMonth()},
      {start:time.add(-1,"month").getFirstDayOfMonth(),end:time.add(-1,"month").getLastDayOfMonth()},
      {start:time.getFirstDayOfYear(),end:time.getLastDayOfYear()},
    ]
    const refOverlayVisible = ref(false)
    const ref_selected = ref("本月")


    watchEffect(() => {
      if (ref_selected.value === '自定义时间') {
        refOverlayVisible.value = true
      }
    })

    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
      customTime.start = temp_customTime.start
      customTime.end = temp_customTime.end
    }

    return () => {
      return (
        <MainLayout>{
          {
            title:() => "山竹记账",
            icon:() => <OverlayIcon></OverlayIcon>,
            default:() => (
              <>
              <Tabs v-model:selected={ref_selected.value} onUpdate:selected={(kind) => { if(kind === "自定义时间") refOverlayVisible.value = true}}>
                <Tab kind="本月">
                  <Charts startDate={itemTimeList[0].start.format()} endDate={itemTimeList[0].end.format()}/>
                </Tab>
                <Tab kind="上月">
                  <Charts startDate={itemTimeList[1].start.format()} endDate={itemTimeList[1].end.format()}/>
                </Tab>
                <Tab kind="今年">
                  <Charts startDate={itemTimeList[2].start.format()} endDate={itemTimeList[2].end.format()}/>
                </Tab>
                <Tab kind="自定义时间">
                  <Charts startDate={customTime.start} endDate={customTime.end}/>
                </Tab>
              </Tabs>
              <Overlay show={refOverlayVisible.value} class={s.overlay} >
                <div class={s.overlay_inner}>
                  <header>
                    请选择时间
                  </header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem label='开始时间' v-model:value={temp_customTime.start} type='date' />
                      <FormItem label='结束时间' v-model:value={temp_customTime.end} type='date' />
                      <FormItem>
                        <div class={s.actions}>
                          <Button type="button" onClick={() => refOverlayVisible.value = false} class={s.button}>取消</Button>
                          <Button type="submit" class={s.button}>确认</Button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </Overlay>
              <FloatButton onClick={() => router.push("/items/create")} class={s.float_button} iconName='add' />
              </>
            )
          }  
        }</MainLayout>
      )
    }
  },
})

export default StatisticsPage
