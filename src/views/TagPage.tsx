import {defineComponent} from "vue";
import { RouterView } from "vue-router";
export const TagPage = defineComponent({
  setup() {
    return () => {
      return (
        <RouterView></RouterView>
      )
    }
  },
})