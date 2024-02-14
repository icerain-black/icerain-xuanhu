import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './ItemSummary.module.scss';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { http } from '../../shared/http/http';
import { Time } from '../../shared/time/time';
import { Button } from '../../shared/Button/Button';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    }
  },
  setup: (props, context) => {
    const ref_page = ref(1)
    const refHasMore = ref(false);
    const ref_items = ref<Item[]>([])

    const fetchItem = async () => {
      if (!props.startDate || !props.endDate) {
        return
      }
      const res = await http.get<ItemData<Item>>("/items",{
        happened_after:props.startDate,
        happened_before:props.endDate,
        page:ref_page.value
      })
      const {resources,pager} = res.data
      console.log(resources);
      
      ref_page.value = pager.page
      ref_items.value.push(...resources)

      refHasMore.value = ((pager.page - 1) * pager.per_page + resources.length) < pager.count
      ref_page.value++
    }

    onMounted(() => {
      fetchItem()
    })
    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li><span>收入</span><span>128</span></li>
          <li><span>支出</span><span>99</span></li>
          <li><span>净收入</span><span>39</span></li>
        </ul>
        <ol class={s.list}>
          {ref_items.value.map(item => {
            return (
            <li id={item.id.toString()}>
              <div class={s.sign}>
                <span>{item.tags[0].sign}</span>
              </div>
              <div class={s.text}>
                <div class={s.tagAndAmount}>
                  <span class={s.tag}>{item.tags[0].name}</span>
                  <span class={s.amount}>￥{item.amount}</span>
                </div>
                <div class={s.time}>
                  {new Time(item.happened_at).format()}
                </div>
              </div>
            </li>
            )
          })}
        </ol>
        <div class={s.more}>
          {
            refHasMore.value ? 
            <Button onClick={fetchItem}>点击加载更多</Button> : 
            <span>已经到底了</span>
          }
        </div>
        <div class={s.float_button}>
          <FloatButton iconName='add' />
        </div>
      </div>
    )
  }
})