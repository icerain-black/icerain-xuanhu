import {defineComponent} from "vue";
import { Icon } from "../shared/Icon/Icon";
import { Form, FormItem } from "../shared/Form/Form";
import { Button } from "../shared/Button/Button";
import { MainLayout } from "../shared/MainLayout/MainLayout";
export const SignInPage = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <MainLayout>{
          {
            title:() => "登录",
            icon:() => <Icon name="left"></Icon>,
            default:() => (
              <Form>
                <FormItem label="邮箱地址" type="text"></FormItem>
                <FormItem label="验证码" type="validationCode"></FormItem>
                <FormItem>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            ) 
          }
        }</MainLayout>
      )
    }
  },
})