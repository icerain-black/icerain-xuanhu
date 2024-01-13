import { defineComponent, reactive, toRaw } from "vue";
import s from "./TagCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Icon } from "../../shared/Icon/Icon";
import { Button } from "../../shared/Button/Button";
import { EmojiSelect } from "../../shared/EmojiSelect/EmojiSelect";
import { validata,Rules, FormError } from "../../shared/validate/validata";
export const TagCreate = defineComponent({
  setup(props, ctx) {
    const formData = reactive({
      name: '',
      sign: '',
    })

    let errors:FormError<typeof formData> = reactive({})

    const rules:Rules<typeof formData> = [
      {key:"name",type:"require",require:true,message:"必填"},
      {key:"name",type:"pattern",exp:/^.{1,4}$/,message:"只能1~4个字符"},
      {key:"sign",type:"require",require:true,message:"必填"}
    ]
    const formSubmit = (e:Event) => {
      e.preventDefault()
      let raw_formData = toRaw(formData)
      Object.assign(errors,{
        name:[],
        sign:[]
      })
      Object.assign(errors,validata(raw_formData,rules))
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
                        class={[s.formItem, s.input, errors.name?.[0] && s.error]}
                        type="text"
                      />
                    </div>
                    <div class={s.formItem_errorHint}>
                      <span>{errors["name"]?.[0] ?? "　"}</span>
                    </div>
                  </label>
                </div>
                <div class={s.formRow}>
                  <label class={s.formLabel}>
                    <span class={s.formItem_name}>符号 {formData.sign}</span>
                    <div class={s.formItem_value}>
                      <EmojiSelect v-model:emoji={formData.sign} error={errors.sign?.[0] ? true : false} class={[s.formItem, s.emojiList]}/>
                    </div>
                    <div class={s.formItem_errorHint}>
                      <span>{errors["sign"]?.[0] ?? "　"}</span>
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

