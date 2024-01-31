import { defineComponent, onMounted, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
import { http } from "../../shared/http/http";
import { Button } from "../../shared/Button/Button";
import { useTags } from "../../shared/Tabs/useTags";
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    const ref_selected = ref("支出");
    const {
      refHasMore:refExpensesHasMore,
      refTags:refExpensesTags,
      fetcherTags:expensesFetcherTags
    } = useTags((page:number) => {
      return http.get<TagData<Tag>>("/tags",{
        kind:"expenses",
        page:page + 1,
        _mock:"tagIndex"
      })
    })

    const {
      refHasMore:refIncomeHasMore,
      refTags:refIncomeTags,
      fetcherTags:incomeFetcherTags
    } = useTags((page:number) => {
      return http.get<{resources:Tag[]}>("/tags",{
        kind:"income",
        page:page + 1,
        _mock:"tagIndex"
      })
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
                  <Tabs v-model:selected={ref_selected.value} class={s.tabs}>
                    <Tab kind="支出" >
                      <div class={s.tags_wrapper}>
                        <div class={s.tag}>
                          <div class={s.sign}>
                            <Icon name="add" class={s.createTag} />
                          </div>
                          <div class={s.name}>新增</div>
                        </div>
                          {refExpensesTags.value.map((tag) => (
                            <div class={[s.tag, s.selected]}>
                              <div class={s.sign}>{tag.sign}</div>
                              <div class={s.name}>{tag.name}</div>
                            </div>
                          ))}
                      </div>
                      <div class={s.hasMore_wrapper}>
                        {refExpensesHasMore.value ? <Button onClick={expensesFetcherTags}>点击加载更多</Button> : <span>没有更多标签</span>}
                      </div>
                    </Tab>
                    <Tab kind="收入" >
                      <div class={s.tags_wrapper}>
                        <div class={s.tag}>
                          <div class={s.sign}>
                            <Icon name="add" class={s.createTag} />
                          </div>
                          <div class={s.name}>新增</div>
                        </div>
                          {refIncomeTags.value.map((tag) => (
                            <div class={[s.tag, s.selected]}>
                              <div class={s.sign}>{tag.sign}</div>
                              <div class={s.name}>{tag.name}</div>
                            </div>
                          ))}
                      </div>
                      <div class={s.hasMore_wrapper}>
                        {refIncomeHasMore.value ? <Button onClick={incomeFetcherTags}>点击加载更多</Button> : <span>没有更多标签</span>}
                      </div>
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
