import { defineComponent } from "vue";
import s from "./TagCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Button } from "../../shared/Button/Button";
import { TagFrom } from "./TagForm";
import { BackIcon } from "../../shared/BackIcon/BackIcon";
export const TagCreate = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <MainLayout>
          {{
            title: () => "新建标签",
            icon: () => <BackIcon></BackIcon>,
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

