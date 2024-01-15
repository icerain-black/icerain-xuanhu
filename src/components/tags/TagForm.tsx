import { defineComponent, reactive, toRaw } from "vue";
import s from "./TagForm.module.scss";
import { FormError, Rules, validata } from "../../shared/validate/validata";
import { Form, FormItem } from "../../shared/Form/Form";
export const TagFrom = defineComponent({
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
        <Form onSubmit={formSubmit}>
          <FormItem type="text" v-model:value={formData.name} error={errors.name?.[0]} />
          <FormItem type="emojiSelect" v-model:value={formData.sign} error={errors.sign?.[0]} />
          <FormItem>
            <p class={s.tips}>记账时长按标签，即可进行编辑</p>
          </FormItem>
          <FormItem>
            {ctx.slots.default?.()}
          </FormItem>
        </Form>
      );
    };
  },
});
