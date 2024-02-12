import { defineComponent, reactive, toRaw } from "vue";
import s from "./TagForm.module.scss";
import { FormError, Rules, hasError, validata } from "../../shared/validate/validata";
import { Form, FormItem } from "../../shared/Form/Form";
import { useRoute, useRouter } from "vue-router";
import { http } from "../../shared/http/http";
export const TagFrom = defineComponent({
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    if (!route.query.kind) {
      return () => 
      <div>
        参数错误
      </div>
    }
    const formData = reactive({
      name: '',
      sign: '',
      kind:route.query.kind.toString()
    })

    let errors:FormError<typeof formData> = reactive({})

    const rules:Rules<typeof formData> = [
      {key:"name",type:"require",require:true,message:"必填"},
      {key:"name",type:"pattern",exp:/^.{1,4}$/,message:"只能1~4个字符"},
      {key:"sign",type:"require",require:true,message:"必填"}
    ]
    const formSubmit = async (e:Event) => {
      e.preventDefault()
      let raw_formData = toRaw(formData)
      Object.assign(errors,{
        name:[],
        sign:[]
      })
      Object.assign(errors,validata(raw_formData,rules))
      if (!hasError(errors)) {
        const response = await http.post("/tags",formData,{
          params:{
            _mock:"tagCreate"
          }
        }).catch(error => {
          if (error.response?.status === 422) {
            Object.assign(errors,error.response.data.errors)
          }
          throw error
        })
        router.push("/items/create")
      }
    }
    return () => {
      return (
        <Form onSubmit={formSubmit}>
          <FormItem label="标签名" type="text" v-model:value={formData.name} error={errors.name?.[0]} />
          <FormItem label={`表情 ${formData.sign}`} type="emojiSelect" v-model:value={formData.sign} error={errors.sign?.[0]} />
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
