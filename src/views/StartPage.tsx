import {defineComponent} from "vue";
import s from "./StartPage.module.scss"
import { Button } from "../shared/Button/Button";
import { FloatButton } from "../shared/FloatButton/FloatButton";
import { Center } from "../shared/Center/Centet";
import { Icon } from "../shared/Icon/Icon";
export const StartPage = defineComponent({
  setup(props, ctx) {
    const click = () => {
      console.log("hi");
      
    }
    return () => {
      return (
        <div class={s.start_page}>
         <nav>
          nav
         </nav>
         <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig}></Icon>
         </Center>
         <Button onClick={click}>
            测试
         </Button>
         <FloatButton></FloatButton>
        </div>
      )
    }
  },
})