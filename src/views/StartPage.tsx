import {defineComponent} from "vue";
import s from "./StartPage.module.scss"
import { Button } from "../shared/Button/Button";
import { FloatButton } from "../shared/FloatButton/FloatButton";
export const StartPage = defineComponent({
  setup(props, ctx) {
    const click = () => {
      console.log("hi");
      
    }
    return () => {
      return (
        <div>
         <Button onClick={click}>
            测试
         </Button>
         <FloatButton></FloatButton>
        </div>
      )
    }
  },
})