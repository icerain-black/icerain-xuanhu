import { defineComponent, reactive, toRaw } from "vue";
import s from "./TagCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Button } from "../../shared/Button/Button";
import { EmojiSelect } from "../../shared/EmojiSelect/EmojiSelect";
export const TagCreate = defineComponent({
  setup(props, ctx) {
    const formData = reactive({
      name: '',
      sign: 'x',
    })

    const errors = reactive({
    })

    const rules = [
      {key:"name",require:true,message:"必填"},
      {key:"name",pattern:/^.{1,4}$/,message:"只能1~4个字符"},
      {key:"sign",require:true,message:"必填"}
    ]
    const formSubmit = (e:Event) => {
      e.preventDefault()
      let value = toRaw(formData)
      // errors = validata(value,rules)
    }
    
    return () => {
      return (
        <MainLayout>
          {{
            title: () => "新建标签",
            icon: () => <Icon name="left" onClick={() => {}}></Icon>,
            default: () => (
              <form class={s.form} onSubmit={formSubmit}>
                <div class={s.formRow}>
                  <label class={s.formLabel}>
                    <span class={s.formItem_name}>标签名</span>
                    <div class={s.formItem_value}>
                      <input
                        v-model={formData.name}
                        class={[s.formItem, s.input, s.error]}
                        type="text"
                      />
                    </div>
                    <div class={s.formItem_errorHint}>
                      <span>必填</span>
                    </div>
                  </label>
                </div>
                <div class={s.formRow}>
                  <label class={s.formLabel}>
                    <span class={s.formItem_name}>符号 {formData.sign}</span>
                    <div class={s.formItem_value}>
                      <EmojiSelect v-model:emoji={formData.sign} class={[s.formItem, s.emojiList, s.error]}/>
                    </div>
                    <div class={s.formItem_errorHint}>
                      <span>必填</span>
                    </div>
                  </label>
                </div>
                <p class={s.tips}>记账时长按标签，即可进行编辑</p>
                <div class={s.formRow}>
                  <div class={s.formItem_value}>
                    <Button class={[s.formItem, s.button]}>确定</Button>
                  </div>
                </div>
              </form>
            ),
          }}
        </MainLayout>
      );
    };
  },
});
