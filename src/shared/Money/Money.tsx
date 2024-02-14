import {defineComponent} from "vue";
export const Money = defineComponent({
  props:{
    value:{
      type:Number,
      require:true
    }
  },
  setup(props, ctx) {
    const addZero = (n:number) => {
      const nString = n.toString()
      const pointIndex = nString.indexOf(".")
      if (pointIndex < 0) {
        return nString + ".00"
      }else if (nString.substring(pointIndex).length === 2) {
        return nString + "0"
      }else{
        return nString
      }
    }

    return () => {
      return (
        <span>￥{props.value && addZero(props.value / 100)}</span>
      )
    }
  },
})