import {PropType, computed, defineComponent} from "vue";
import { Time } from "../time/time";
export const DateTime = defineComponent({
  props:{
    time:{
      type:[Date,String] as PropType<Date | string>,
      require:true
    },
    format:{
      type:String as PropType<string>,
      default:"YYYY-MM-DD HH:mm:ss"
    }
  },
  setup(props, ctx) {
    const dateFormat = computed(() => new Time(props.time).format("YYYY-MM-DD HH:mm:ss"))
    return () => {
      return (
        <span>{dateFormat.value}</span>
      )
    }
  },
})