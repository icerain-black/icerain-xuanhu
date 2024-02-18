import {defineComponent} from "vue";
import { Icon } from "../Icon/Icon";
import { useRoute, useRouter } from "vue-router";
export const BackIcon = defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const onClick = () => {
      if (route.query.return_to?.toString()) {
        router.push(route.query.return_to?.toString())
      }else{
        router.back()
      }
    }
    return () => {
      return (
        <Icon name="left" onClick={onClick}></Icon>
      )
    }
  },
})