import { Ref, onMounted, onUnmounted } from "vue";

type Point = {
  x:number,
  y:number
}

const direction = (startPoint:Point,endPoint:Point) => {
  let x = startPoint.x > endPoint.x ? "left" : "right"
  let y = startPoint.y > endPoint.y ? "up" : "down"
  return Math.abs(startPoint.x - endPoint.x) > Math.abs(startPoint.y - endPoint.y) ? x : y
}

export const useSwiper = (element:Ref<HTMLElement | undefined>) => {
  const startPoint:Point = {
    x:0,
    y:0
  }

  const endPoint:Point = {
    x:0,
    y:0
  }

  let realDirection = null

  let isSwiping = false

  const onStart = (e:TouchEvent) => {
    isSwiping = true
    startPoint.x = endPoint.x = e.touches[0].clientX
    startPoint.y = endPoint.y = e.touches[0].clientY
  }

  const onMove = (e:TouchEvent) => {
    if (!isSwiping) {
      return
    }
    endPoint.x = e.touches[0].clientX
    endPoint.y = e.touches[0].clientY
  }

  const onEnd = (e:TouchEvent) => {
    isSwiping = false
    realDirection = direction(startPoint,endPoint)
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
}