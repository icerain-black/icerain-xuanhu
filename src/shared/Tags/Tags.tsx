import {PropType, defineComponent, ref} from "vue";
import s from "./Tags.module.scss"
import { useTags } from "./useTags";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { http } from "../http/http";
import { RouterLink, useRoute, useRouter } from "vue-router";
export const Tags = defineComponent({
  props:{
    kind:{
      type:String as PropType<"expenses" | "income">,
      require:true
    },
    select:{
      type:Number
    }
  },
  emits:["update:select"],
  setup(props, ctx) {
    const {
      refHasMore,
      refTags,
      fetcherTags
    } = useTags((page:number) => {
      return http.get<TagData<Tag>>("/tags",{
        kind:props.kind,
        page:page + 1
      },{_loading:true})
    })

    const router = useRouter()

    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()

    const onLongPress = (tagId:number)=>{
      const path = `/tags/${tagId}/edit/`
      router.push({
        path,
        query:{
          kind:props.kind,
        }
      })
    }
    const onTouchStart = (e: TouchEvent,tag:Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(()=>{
        onLongPress(tag.id)
      }, 500)
    }
    const onTouchEnd = () => {
      clearTimeout(timer.value)
    }
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if(currentTag.value !== pointedElement &&
        currentTag.value?.contains(pointedElement) === false){
        clearTimeout(timer.value)
      }
    }

    return () => {
      return (
        <div>
          <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
            <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
              <div class={s.sign}>
                <Icon name="add" class={s.createTag} />
              </div>
              <div class={s.name}>新增</div>
            </RouterLink>
              {refTags.value.map((tag) => (
                <div class={[s.tag, props.select === tag.id ? s.selected : ""]}
                  onClick={() => ctx.emit("update:select",tag.id)}
                  onTouchstart={(e) => onTouchStart(e,tag)}
                  onTouchend={onTouchEnd}
                >
                  <div class={s.sign}>{tag.sign}</div>
                  <div class={s.name}>{tag.name}</div>
                </div>
              ))}
          </div>
          <div class={s.hasMore_wrapper}>
            {refHasMore.value ? <Button onClick={fetcherTags}>点击加载更多</Button> : <span>没有更多标签</span>}
          </div>
        </div>
      )
    }
  },
})