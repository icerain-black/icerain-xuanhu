import { defineComponent, onMounted } from "vue";
import s from "./StartPage.module.scss";
import { Button } from "../shared/Button/Button";
import { FloatButton } from "../shared/FloatButton/FloatButton";
import { Center } from "../shared/Center/Centet";
import { Icon } from "../shared/Icon/Icon";
import { OverlayIcon } from "../shared/OverLay/Overlay";
import { RouterLink } from "vue-router";
import { MainLayout } from "../shared/MainLayout/MainLayout";
export const StartPage = defineComponent({
  setup() {
    onMounted(() => {
      localStorage.setItem("skipFeatures","yes")
    })
    const click = () => {};
    return () => {
      return (
        <MainLayout class={s.start_page}>
          {{
            icon:() => <OverlayIcon></OverlayIcon>,
            title:() => "玄狐记账",
            default:() => <>
              <Center class={s.pig_wrapper}>
                <Icon name="fox" class={s.fox}></Icon>
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

export default StartPage
