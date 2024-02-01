import { defineComponent, reactive, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
import { Tags } from "../../shared/Tags/Tags";
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    const formData = reactive({
      kind:"支出",
      tag_ids:[],
      happent_at:new Date().toISOString(),
      amount:0
    })
    return () => {
      return (
        <MainLayout class={s.layout}>
          {{
            icon: () => <Icon name="left" class={s.navIcon}></Icon>,
            title: () => "记一笔",
            default: () => (
              <>
                <div class={s.wrapper}>
                  {JSON.stringify(formData)}
                  <Tabs v-model:selected={formData.kind} class={s.tabs}>
                    <Tab kind="支出" >
                      <Tags kind="expenses"
                       v-model:select={formData.tag_ids[0]}
                      />
                    </Tab>
                    <Tab kind="收入" >
                      <Tags kind="income"
                        v-model:select={formData.tag_ids[0]}
                      />
                    </Tab>
                  </Tabs>
                  <div class={s.inputPad_wrapper}>
                    <InputPad
                      v-model:happenAt={formData.happent_at}
                      v-model:amount={formData.amount}
                    />
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
