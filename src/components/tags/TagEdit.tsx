import {defineComponent} from "vue";
import s from "./TagEdit.module.scss"
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { TagFrom } from "./TagForm";
import { Button } from "../../shared/Button/Button";
import { BackIcon } from "../../shared/BackIcon/BackIcon";
import { useRoute } from "vue-router";
export const TagEdit = defineComponent({
  setup(props, ctx) {
    const route = useRoute()
    return () => {
      return (
        <MainLayout>
          {{
            title: () => "编辑标签",
            icon: () => <BackIcon></BackIcon>,
            default: () => (
              <>
                <TagFrom class={s.tagForm} id={+route.params.id}>
                  <div class={s.buttons}>
                    <div class={s.main}>
                      <Button class={[s.formItem, s.button]}>确定</Button>
                    </div>
                    <div class={s.remove}>
                      <Button level="danger" class={s.remove_tag}>删除标签</Button>
                      <Button level="danger" class={s.remove_tag_and_items}>删除标签和记账</Button>
                    </div>
                  </div>
                </TagFrom>
              </>
            ),
          }}
        </MainLayout>
      )
    }
  },
})