import { defineComponent, reactive, toRaw } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../shared/MainLayout/MainLayout";
import { Tab, Tabs } from "../../shared/Tabs/Tabs";
import { InputPad } from "./InputPad";
import { Tags } from "../../shared/Tags/Tags";
import { http } from "../../shared/http/http";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { Dialog } from "vant";
import { BackIcon } from "../../shared/BackIcon/BackIcon";
import { FormError, Rules, hasError, validata } from "../../shared/validate/validata";
export const ItemCreate = defineComponent({
  setup() {
    const formData = reactive<Partial<Item>>({
      kind:"expenses",
      tag_ids:[],
      happen_at:new Date().toISOString(),
      amount:0
    })
    const errors = reactive<FormError<typeof formData>>({})
    const rules:Rules<typeof formData> = [
      {key:"kind",type:"require",require:true,message:"必填"},
      {key:"tag_ids",type:"requireSign",require:true,message:"必须选择一个标签"},
      {key:"amount",type:"require",require:true,message:"金额必填"},
      {key:"amount",type:"notEqual",value:0,message:"金额不能为0"},
      {key:"happen_at",type:"require",require:true,message:"日期必填"}
    ]
    
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        })
      }
      throw error
    }

    const onSumit = async() => {
      Object.assign(errors,{
        kind:[],
        tag_ids:[],
        happen_at:[],
        amount:[]
      })
      let raw_formData = toRaw(formData)
      Object.assign(errors,validata(raw_formData,rules))
      
      if (hasError(errors)) {
        Dialog.alert({
          title: '出错',
          message: Object.values(errors).filter(i => i.length > 0).join('\n')
        })
        return
      }
      await http.post<Resource<Item>>("/items",formData).catch(onError)
      router.push("/items")
    }
    return () => {
      return (
        <MainLayout class={s.layout}>
          {{
            icon: () => <BackIcon to="/items"></BackIcon>,
            title: () => "记一笔",
            default: () => (
              <>
                <div class={s.wrapper}>
                  <Tabs v-model:selected={formData.kind} class={s.tabs}>
                    <Tab kind="expenses" >
                      <Tags kind="expenses"
                       v-model:select={formData.tag_ids![0]}
                      />
                    </Tab>
                    <Tab kind="income" >
                      <Tags kind="income"
                        v-model:select={formData.tag_ids![0]}
                      />
                    </Tab>
                  </Tabs>
                  <div class={s.inputPad_wrapper}>
                    <InputPad
                      v-model:happenAt={formData.happened_at}
                      v-model:amount={formData.amount}
                      onSumit={onSumit}
                    />
                  </div>
                </div>
              </>
            ),
          }}
        </MainLayout>
      );
    };
  },
});
