import { defineComponent, ref } from "vue";
import s from "./StartPage.module.scss";
import { Button } from "../shared/Button/Button";
import { FloatButton } from "../shared/FloatButton/FloatButton";
import { Center } from "../shared/Center/Centet";
import { Icon } from "../shared/Icon/Icon";
import { Overlay, OverlayIcon } from "../shared/OverLay/Overlay";
import { RouterLink } from "vue-router";
import { MainLayout } from "../shared/MainLayout/MainLayout";
export const StartPage = defineComponent({
  setup(props, ctx) {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };
    const click = () => {
      console.log("hi");
    };
    return () => {
      return (
        <MainLayout class={s.start_page}>
          {{
            icon:() => <OverlayIcon></OverlayIcon>,
            title:() => "山竹记账",
            default:() => <>
              <Center class={s.pig_wrapper}>
                <Icon name="pig" class={s.pig}></Icon>
              </Center>
              <RouterLink to="/items">
                <Button onClick={click} class={s.button}>开始记账</Button>
              </RouterLink>
              <RouterLink to="/items">
                <FloatButton></FloatButton>
              </RouterLink>
              
            </>
          }}
        </MainLayout>
      );
    };
  },
});
