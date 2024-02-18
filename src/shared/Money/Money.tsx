import {defineComponent} from "vue";
export const Money = defineComponent({
  props:{
    value:{
      type:Number,
      require:true
    }
  },
  setup(props) {
    return () => {
      return (
        <span>￥{props.value && addZero(props.value / 100)}</span>
      )
    }
  },
})

const addZero = (n: number) => {
  const nString = n.toString()
  const dotIndex = nString.indexOf('.')
  if (dotIndex < 0) {
    return nString + '.00'
  } else if (nString.substring(dotIndex).length === 2) {
    return nString + '0'
  } else {
    return nString
  }
}
export const getMoney = (n: number) => {
  return addZero(n / 100)
}