import {defineComponent} from "vue";
import s from "./ItemPage.module.scss"
import { RouterView } from "vue-router";
export const ItemPage = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <RouterView>
         
        </RouterView>
      )
    }
  },
})