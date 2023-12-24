import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export const WelcomePage = defineComponent({
  setup() {
    return () => {
      return (
        <div>
          欢迎界面
          <RouterView/>
        </div>
      )
    }
  },
})