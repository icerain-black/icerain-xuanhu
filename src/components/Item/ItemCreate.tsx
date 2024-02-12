import { defineComponent, reactive, ref } from "vue";
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
export const ItemCreate = defineComponent({
  setup(props, ctx) {
    const formData = reactive({
      kind:"expenses",
      tag_ids:[],
      happen_at:new Date().toISOString(),
      amount:0
    })
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
      await http.post<Resource<itemCreateRes>>("/items",formData).catch(onError)
      router.push("/items")
    }
    return () => {
      return (
        <MainLayout class={s.layout}>
          {{
            icon: () => <BackIcon class={s.navIcon}></BackIcon>,
            title: () => "记一笔",
            default: () => (
              <>
                <div class={s.wrapper}>
                  <Tabs v-model:selected={formData.kind} class={s.tabs}>
                    <Tab kind="expenses" >
                      <Tags kind="expenses"
                       v-model:select={formData.tag_ids[0]}
                      />
                    </Tab>
                    <Tab kind="income" >
                      <Tags kind="income"
                        v-model:select={formData.tag_ids[0]}
                      />
                    </Tab>
                  </Tabs>
                  <div class={s.inputPad_wrapper}>
                    <InputPad
                      v-model:happenAt={formData.happen_at}
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
