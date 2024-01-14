import {defineComponent, ref} from "vue";
import s from "./ItemList.module.scss"
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
export const ItemList = defineComponent({
  setup(props, ctx) {
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
                  本月
                </Tab>
                <Tab kind="上月">
                  上月
                </Tab>
                <Tab kind="今年">
                  今年
                </Tab>
                <Tab kind="自定义时间">
                  自定义时间
                </Tab>
              </Tabs>
            )
          }  
        }</MainLayout>
      )
    }
  },
})