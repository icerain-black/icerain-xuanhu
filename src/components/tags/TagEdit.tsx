import {defineComponent} from "vue";
import s from "./TagEdit.module.scss"
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { TagFrom } from "./TagForm";
import { Button } from "../../shared/Button/Button";
import { BackIcon } from "../../shared/BackIcon/BackIcon";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "vant";
import { http } from "../../shared/http/http";
export const TagEdit = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const tagId = route.params.id

    const onDeleteTag = async () => {
      Dialog.confirm({
        title: '警告',
        message: "请问是否要删除标签以及相关记账",
      })
        .then(async () => {
        await http.delete(`/tags/${tagId}`,{},{_loading:true})
        router.back()
      })
        .catch(() => {})
    }
    return () => {
      return (
        <MainLayout>
          {{
            title: () => "编辑标签",
            icon: () => <BackIcon></BackIcon>,
            default: () => (
              <>
                <TagFrom class={s.tagForm} id={+tagId}>
                  <div class={s.buttons}>
                    <div class={s.main}>
                      <Button class={[s.formItem, s.button]}>确定</Button>
                    </div>
                    <div class={s.remove}>
                      <Button type="button" level="danger" class={s.remove_tag_and_items} onClick={onDeleteTag}>删除标签(以及相关记账)</Button>
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