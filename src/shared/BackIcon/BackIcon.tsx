import {defineComponent} from "vue";
import { Icon } from "../Icon/Icon";
import s from "./BackIcon.module.scss"
import { useRoute, useRouter } from "vue-router";
export const BackIcon = defineComponent({
  props:{
    to:{
      type:String
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const onClick = () => {
      if (props.to) {
        router.push(props.to)
      }else{
        const {return_to} = route.query
        if (return_to?.toString()) {
          router.push(return_to?.toString())
        }else{
          router.back()
        }
      }
    }
    return () => {
      return (
        <Icon name="left" class={s.navIcon} onClick={onClick}></Icon>
      )
    }
  },
})