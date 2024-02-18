import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import s from './ItemSummary.module.scss';
import { FloatButton } from '../../shared/FloatButton/FloatButton';
import { http } from '../../shared/http/http';
import { Time } from '../../shared/time/time';
import { Button } from '../../shared/Button/Button';
import { Money } from '../../shared/Money/Money';
import { DateTime } from '../../shared/DateTime/DateTime';
import { useRouter } from 'vue-router';
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
    const router = useRouter()

    const ref_page = ref(1)
    const refHasMore = ref(false);
    const ref_items = ref<Item[]>([])

    const balanceData = reactive<Balance>({
      balance: 0,
      expenses: 0,
      income: 0
    })

    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) {return}
      const res = await http.get<ItemData<Item>>("/items",{
        happened_after:props.startDate,
        happened_before:props.endDate,
        page:ref_page.value
      },{_loading:true})
      const {resources,pager} = res.data
      
      ref_page.value = pager.page
      ref_items.value.push(...resources)

      refHasMore.value = ((pager.page - 1) * pager.per_page + resources.length) < pager.count
      ref_page.value++
    }

    const fetchBalance = async () => {
      if (!props.startDate || !props.endDate) {return}
      const res = await http.get<Balance>("/items/balance",{
        happened_after:props.startDate,
        happened_before:props.endDate,
      })
      
      Object.assign(balanceData,res.data)
    }

    onMounted(() => {
      fetchItems()
      fetchBalance()
    })

    watch(()=>[props.startDate,props.endDate], ()=>{
      ref_items.value = []
      refHasMore.value = false
      ref_page.value = 1
      fetchItems()
      fetchBalance()
    })
    
    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li><span>收入</span><span>{balanceData.income / 100}</span></li>
          <li><span>支出</span><span>{balanceData.expenses / 100}</span></li>
          <li><span>净收入</span><span>{balanceData.balance / 100}</span></li>
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
                  <span class={s.amount}>
                    <Money value={item.amount}></Money>
                  </span>
                </div>
                <div class={s.time}>
                  <DateTime time={item.happened_at}></DateTime>
                </div>
              </div>
            </li>
            )
          })}
        </ol>
        <div class={s.more}>
          {
            refHasMore.value ? 
            <Button onClick={fetchItems}>点击加载更多</Button> : 
            <span>已经到底了</span>
          }
        </div>
        <FloatButton onClick={() => router.push("/items/create")} class={s.float_button} iconName='add' />
      </div>
    )
  }
})