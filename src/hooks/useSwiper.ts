import { Ref, onMounted, onUnmounted, ref } from "vue";

type Point = {
  x:number,
  y:number
}

type Options = {
  beforStart?:(e:TouchEvent) => void,
  afterStart?:(e:TouchEvent) => void,
  beforMove?:(e:TouchEvent) => void,
  afterMove?:(e:TouchEvent) => void,
  beforEnd?:(e:TouchEvent) => void,
  afterEnd?:(e:TouchEvent) => void
}

const direction = (startPoint:Point,endPoint:Point):"up" | "down" | "left" | "right" => {
  let x:"left" | "right" = startPoint.x > endPoint.x ? "left" : "right"
  let y:"up" | "down" = startPoint.y > endPoint.y ? "up" : "down"
  return Math.abs(startPoint.x - endPoint.x) > Math.abs(startPoint.y - endPoint.y) ? x : y
}

export const useSwiper = (element:Ref<HTMLElement | undefined>,options?:Options) => {
  const ref_startPoint = ref({
    x:0,
    y:0
  })

  const ref_endPoint = ref({
    x:0,
    y:0
  })

  let realDirection = ref<"up" | "down" | "left" | "right" | null>(null)

  let isSwiping = ref(false)

  const onStart = (e:TouchEvent) => {
    options?.beforStart?.(e)
    e.preventDefault()
    isSwiping.value = true
    ref_startPoint.value.x = ref_endPoint.value.x = e.touches[0].clientX
    ref_startPoint.value.y = ref_endPoint.value.y = e.touches[0].clientY
    options?.afterStart?.(e)
  }

  const onMove = (e:TouchEvent) => {
    options?.beforMove?.(e)
    if (!isSwiping) {
      return
    }
    ref_endPoint.value.x = e.touches[0].clientX
    ref_endPoint.value.y = e.touches[0].clientY
    options?.afterMove?.(e)
  }

  const onEnd = (e:TouchEvent) => {
    options?.beforEnd?.(e)
    isSwiping.value = false
    realDirection.value = direction(ref_startPoint.value,ref_endPoint.value)
    options?.afterEnd?.(e)
  }
  onMounted(() => {
    if (!element.value) {return}
    element.value.addEventListener("touchstart",onStart,{passive:false})
    element.value.addEventListener("touchmove",onMove,{passive:false})
    element.value.addEventListener("touchend",onEnd)
  })

  onUnmounted(() => {
    if (!element.value) {return}
    element.value.removeEventListener("touchstart",onStart)
    element.value.removeEventListener("touchmove",onMove)
    element.value.removeEventListener("touchend",onEnd)
  })

  return {isSwiping,realDirection}
}