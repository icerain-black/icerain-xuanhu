import { defineComponent, ref } from "vue";
import s from "./StartPage.module.scss";
import { Button } from "../shared/Button/Button";
import { FloatButton } from "../shared/FloatButton/FloatButton";
import { Center } from "../shared/Center/Centet";
import { Icon } from "../shared/Icon/Icon";
import { Navbar } from "../shared/Navbar/Navbar";
import { Overlay } from "../shared/OverLay/Overlay";
import { RouterLink } from "vue-router";
export const StartPage = defineComponent({
  setup(props, ctx) {
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    const click = () => {
      console.log("hi");
    };
    return () => {
      return (
        <div class={s.start_page}>
          <nav>
            <Navbar>
              {{
                icon:() => <Icon name="menu" class={s.navIcon} onClick={onClickMenu}></Icon>,
                default:() => "山竹记账"
              }}
            </Navbar>
          </nav>
          <Center class={s.pig_wrapper}>
            <Icon name="pig" class={s.pig}></Icon>
          </Center>
          <RouterLink to="/items">
            <Button onClick={click}>开始记账</Button>
          </RouterLink>
          <RouterLink to="/items">
            <FloatButton></FloatButton>
          </RouterLink>
          {refOverlayVisible.value &&
          <Overlay onClose={() => refOverlayVisible.value = false} />
        }
        </div>
      );
    };
  },
});
