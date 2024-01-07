import {defineComponent} from "vue";
import s from "./TagPage.module.scss"
import { RouterView } from "vue-router";
export const TagPage = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <RouterView></RouterView>
      )
    }
  },
})