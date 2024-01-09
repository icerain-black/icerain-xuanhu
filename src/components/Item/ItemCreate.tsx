import { defineComponent, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    return () => {
      const ref_selected = ref("支出");
      const ref_expensesTags = ref([
        { id: "1", name: "餐费", sign: "¥", category: "expenses" },
        { id: "2", name: "吃饭", sign: "¥", category: "expenses" },
        { id: "3", name: "打车", sign: "¥", category: "expenses" },
      ]);

      const ref_incomeTags = ref([
        { id: 4, name: "工资", sign: "￥", category: "income" },
        { id: 5, name: "彩票", sign: "￥", category: "income" },
        { id: 6, name: "滴滴", sign: "￥", category: "income" },
        { id: 11, name: "彩票", sign: "￥", category: "income" },
        { id: 18, name: "滴滴", sign: "￥", category: "income" },
        { id: 17, name: "彩票", sign: "￥", category: "income" },
        { id: 19, name: "滴滴", sign: "￥", category: "income" },
        { id: 4, name: "工资", sign: "￥", category: "income" },
        { id: 5, name: "彩票", sign: "￥", category: "income" },
        { id: 6, name: "滴滴", sign: "￥", category: "income" },
        { id: 11, name: "彩票", sign: "￥", category: "income" },
        { id: 18, name: "滴滴", sign: "￥", category: "income" },
        { id: 17, name: "彩票", sign: "￥", category: "income" },
        { id: 19, name: "滴滴", sign: "￥", category: "income" },
        { id: 4, name: "工资", sign: "￥", category: "income" },
        { id: 5, name: "彩票", sign: "￥", category: "income" },
        { id: 6, name: "滴滴", sign: "￥", category: "income" },
        { id: 11, name: "彩票", sign: "￥", category: "income" },
        { id: 18, name: "滴滴", sign: "￥", category: "income" },
        { id: 17, name: "彩票", sign: "￥", category: "income" },
        { id: 19, name: "滴滴", sign: "￥", category: "income" },
        { id: 4, name: "工资", sign: "￥", category: "income" },
        { id: 5, name: "彩票", sign: "￥", category: "income" },
        { id: 6, name: "滴滴", sign: "￥", category: "income" },
        { id: 11, name: "彩票", sign: "￥", category: "income" },
        { id: 18, name: "滴滴", sign: "￥", category: "income" },
        { id: 17, name: "彩票", sign: "￥", category: "income" },
        { id: 19, name: "滴滴", sign: "￥", category: "income" },
        { id: 4, name: "工资", sign: "￥", category: "income" },
        { id: 5, name: "彩票", sign: "￥", category: "income" },
        { id: 6, name: "滴滴", sign: "￥", category: "income" },
        { id: 11, name: "彩票", sign: "￥", category: "income" },
        { id: 18, name: "滴滴", sign: "￥", category: "income" },
        { id: 17, name: "彩票", sign: "￥", category: "income" },
        { id: 19, name: "滴滴", sign: "￥", category: "income" },
      ]);

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
