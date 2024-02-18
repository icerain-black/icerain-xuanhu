import {defineComponent, reactive, ref, toRaw} from "vue";
import { Icon } from "../shared/Icon/Icon";
import { Form, FormItem } from "../shared/Form/Form";
import { Button } from "../shared/Button/Button";
import { MainLayout } from "../shared/MainLayout/MainLayout";
import { hasError, validata } from "../shared/validate/validata";
import s from "./SignInPage.module.scss"
import { http } from "../shared/http/http";
import { AxiosError } from "axios";
import { useRoute, useRouter } from "vue-router";
import { refreshMe } from "../shared/me/me";
import { BackIcon } from "../shared/BackIcon/BackIcon";
export const SignInPage = defineComponent({
  setup() {
    const formData = reactive({
      email:"616964@qq.com",
      code:"123456"
    })

    const errors = reactive({
      email:[],
      code:[]
    })

    const router = useRouter()
    const route = useRoute()

    const ref_validationCode = ref<any>()

    const onError = (res:any) => {
      if (res.response) {
        let axiosError:AxiosError = res
        if (axiosError.response?.status === 422) {
          let data = (axiosError.response?.data) as Record<"errors",Record<"email" | "code",string[]>>
          Object.assign(errors,data.errors)
        }
      }
    }
    const submitLogin = async (e:SubmitEvent) => {
      e.preventDefault()
      Object.assign(errors,{
        email:[],code:[]
      })
      Object.assign(errors,validata(toRaw(formData),[
        {key:"email",type:"require",require:true,message:"必填"},
        {key:"code",type:"require",require:true,message:"必填"},
        {key:"email",type:"pattern",exp:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"必须使用邮箱格式"},
      ]))

      if (!hasError(errors)) {
        let result = await http.post<{jwt:string}>("/session",formData,{_loading:true}).catch(onError)   
        localStorage.setItem("jwt",result!.data.jwt)
        const returnTo = route.query.return_to?.toString()
        refreshMe()
        router.push(returnTo || "/")
      }
    }

    const sendValidationCode = async() => {
      let data = {
        email:formData.email
      }
      await http.post("/validation_codes",data,{_loading:true}).catch(onError)
      ref_validationCode.value.startCount?.()
    }

    return () => {
      return (
        <MainLayout>{
          {
            title:() => "登录",
            icon:() => <BackIcon></BackIcon>,
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
                    buttonSelfDisable={true}
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