import {defineComponent, ref} from "vue";
import s from "./ItemCreate.module.scss"
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    return () => {
      const ref_selected = ref("支出")
      return (
        <MainLayout>{
         {
          icon:() => <Icon name="left" class={s.navIcon}></Icon>,
          title:() => "记一笔",
          default:() => (
            <>
              <Tabs v-model:selected={ref_selected.value}>
                <Tab kind="支出">
                  支出
                </Tab>
                <Tab kind="收入">
                  收入
                </Tab>
              </Tabs>
              <div class={s.inputpad_wrapper}>
                <InputPad></InputPad>
              </div>
            </>
          )
         }
        }</MainLayout>
      )
    }
  },
})