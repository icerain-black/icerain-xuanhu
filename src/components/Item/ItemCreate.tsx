import { defineComponent, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
import { Tags } from "../../shared/Tags/Tags";
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    const ref_selected = ref("支出");
    return () => {
      return (
        <MainLayout class={s.layout}>
          {{
            icon: () => <Icon name="left" class={s.navIcon}></Icon>,
            title: () => "记一笔",
            default: () => (
              <>
                <div class={s.wrapper}>
                  <Tabs v-model:selected={ref_selected.value} class={s.tabs}>
                    <Tab kind="支出" >
                      <Tags kind="expenses"></Tags>
                    </Tab>
                    <Tab kind="收入" >
                      <Tags kind="income"></Tags>
                    </Tab>
                  </Tabs>
                  <div class={s.inputPad_wrapper}>
                    <InputPad />
                  </div>
                </div>
              </>
            ),
          }}
        </MainLayout>
      );
    };
  },
});
