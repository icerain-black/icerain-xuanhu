import { defineComponent, onMounted, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
import { http } from "../../shared/http/http";
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    onMounted(async () => {
      const res = await http.get<{resources:Tag[]}>("/tags",{
        kind:"expenses",
        _mock:"tagIndex"
      })
      ref_expensesTags.value = res.data.resources
    })
    const ref_expensesTags = ref<Tag[]>([]);
    onMounted(async () => {
      const res = await http.get<{resources:Tag[]}>("/tags",{
        kind:"income",
        _mock:"tagIndex"
      })
      ref_incomeTags.value = res.data.resources
    })
    const ref_incomeTags = ref<Tag[]>([]);
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
                    <Tab kind="支出" class={s.tags_wrapper}>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>新增</div>
                      </div>
                        {ref_expensesTags.value.map((tag) => (
                          <div class={[s.tag, s.selected]}>
                            <div class={s.sign}>{tag.sign}</div>
                            <div class={s.name}>{tag.name}</div>
                          </div>
                        ))}
                    </Tab>
                    <Tab kind="收入" class={s.tags_wrapper}>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>新增</div>
                      </div>
                        {ref_incomeTags.value.map((tag) => (
                          <div class={[s.tag, s.selected]}>
                            <div class={s.sign}>{tag.sign}</div>
                            <div class={s.name}>{tag.name}</div>
                          </div>
                        ))}
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
