import {defineComponent} from "vue";
import s from "./TagEdit.module.scss"
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { TagFrom } from "./TagForm";
import { Icon } from "../../shared/Icon/Icon";
import { Button } from "../../shared/Button/Button";
export const TagEdit = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <MainLayout>
          {{
            title: () => "新建标签",
            icon: () => <Icon name="left" onClick={() => {}}></Icon>,
            default: () => (
              <>
                <TagFrom class={s.tagForm}></TagFrom>
                <div class={s.buttons}>
                  <div class={s.main}>
                    <Button class={[s.formItem, s.button]}>确定</Button>
                  </div>
                  <div class={s.remove}>
                    <Button level="danger" class={s.remove_tag}>删除标签</Button>
                    <Button level="danger" class={s.remove_tag_and_items}>删除标签和记账</Button>
                  </div>
                </div>
              </>
            ),
          }}
        </MainLayout>
      )
    }
  },
})