import {defineComponent} from "vue";
import s from "./Tabs.module.scss"
export const Tabs = defineComponent({
  props:{
    selected:{
      type:String
    },
  },
  emits:["update:selected"],
  setup(props, ctx) {
    const kindMap:Record<string,string> = {
      "expenses":"支出",
      "income":"收入"
    }
    return () => {
      let nodeArr = ctx.slots.default?.()
      if (!nodeArr) {return}
      for (let i = 0; i < nodeArr.length; i++) {
        if (nodeArr[i].type !== Tab) {
          throw new Error("<Tabs>只接受<Tab>组件");
        }
      }
      return (
        <div>
          <div class={s.tabs}>
            <ol>
              {
                nodeArr.map(item => 
                  <li 
                    class={props.selected === item.props?.kind && s.selected}
                    onClick={() => ctx.emit("update:selected",item.props?.kind)}
                  >
                    {kindMap[item.props?.kind] || item.props?.kind}
                  </li>
                )
              }
            </ol>
          </div>
          <div class={s.tab} key={props.selected}>
            {nodeArr.find(item =>props.selected === item.props?.kind)}
          </div>
        </div>
      )
    }
  },
})

export const Tab = defineComponent({
  props:{
    kind:{
      type:String,
      require:true
    }
  },
  setup(_, ctx) {
    return () => {
      return (
        <div>
         {ctx.slots.default?.()}
        </div>
      )
    }
  },
})