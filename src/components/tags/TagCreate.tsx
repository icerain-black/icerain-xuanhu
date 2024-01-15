import { defineComponent } from "vue";
import s from "./TagCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Button } from "../../shared/Button/Button";
import { TagFrom } from "./TagForm";
export const TagCreate = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <MainLayout>
          {{
            title: () => "新建标签",
            icon: () => <Icon name="left" onClick={() => {}}></Icon>,
            default: () => (
              <>
                <TagFrom>
                  <div class={s.buttons}>
                    <div class={s.main}>
                      <Button class={[s.formItem, s.button]}>确定</Button>
                    </div>
                  </div>
                </TagFrom>
              </>
            ),
          }}
        </MainLayout>
      );
    };
  },
});

