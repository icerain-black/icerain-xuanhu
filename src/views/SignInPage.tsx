import {defineComponent, reactive, ref, toRaw} from "vue";
import { Icon } from "../shared/Icon/Icon";
import { Form, FormItem } from "../shared/Form/Form";
import { Button } from "../shared/Button/Button";
import { MainLayout } from "../shared/MainLayout/MainLayout";
import { validata } from "../shared/validate/validata";
import s from "./SignInPage.module.scss"
import { http } from "../shared/http/http";
export const SignInPage = defineComponent({
  setup(props, ctx) {
    const formData = reactive({
      email:"616964@qq.com",
      code:""
    })

    const errors = reactive({
      email:[],
      code:[]
    })

    const ref_validationCode = ref<any>()

    const submitLogin = (e:SubmitEvent) => {
      e.preventDefault()
      Object.assign(errors,{
        email:[],code:[]
      })
      Object.assign(errors,validata(toRaw(formData),[
        {key:"email",type:"require",require:true,message:"必填"},
        {key:"code",type:"require",require:true,message:"必填"},
        {key:"email",type:"pattern",exp:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"必须使用邮箱格式"},
      ]))
    }

    const sendValidationCode = async() => {
      let data = {
        email:formData.email
      }
      await http.post("/validation_codes",data).catch(res => console.log(res))
      ref_validationCode.value.startCount?.()
    }

    return () => {
      return (
        <MainLayout>{
          {
            title:() => "登录",
            icon:() => <Icon name="left"></Icon>,
            default:() => (
              <div class={s.wrapper}>
                <div class={s.logo}>
                  <Icon class={s.icon} name="mangosteen" />
                  <h1 class={s.appName}>山竹记账</h1>
                </div>
                <Form onSubmit={submitLogin}>
                  <FormItem 
                    v-model:value={formData.email} 
                    error={errors.email?.[0]} 
                    label="邮箱地址" 
                    type="text"
                    placeholder="请输入邮箱地址"
                  />
                  <FormItem 
                    v-model:value={formData.code}
                    ref={ref_validationCode}
                    error={errors.code?.[0]}label="验证码" 
                    type="validationCode"
                    onClick={sendValidationCode}
                    countFrom={1}
                    placeholder="请输入6位数字"
                  />
                  <FormItem style={[{paddingTop:"64px"}]}>
                    <Button type="submit">登录</Button>
                  </FormItem>
                </Form>
              </div>
            ) 
          }
        }</MainLayout>
      )
    }
  },
})