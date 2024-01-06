import {PropType, defineComponent} from "vue";
import s from "./Tabs.module.scss"
export const Tabs = defineComponent({
  props:{
    selected:{
      type:String
    },
  },
  setup(props, ctx) {
    return () => {
      let nodeArr = ctx.slots.default?.()
      if (!nodeArr) {return}
      for (let i = 0; i < nodeArr.length; i++) {
        if (nodeArr[i].type !== Tab) {
          throw new Error("<Tabs>只接受<Tab>组件");
        }
      }
      return (
        <>
          <div class={s.tabs}>
            <ol>
              {
                nodeArr.map(item => 
                  <li 
                    class={props.selected === item.props?.kind ? s.selected : null}
                    onClick={() => ctx.emit("update:selected",item.props?.kind)}
                  >
                    {item.props?.kind}
                  </li>
                )
              }
            </ol>
          </div>
          <div class={s.tab}>
            {nodeArr.find(item => props.selected === item.props?.kind)}
          </div>
        </>
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
  setup(props, ctx) {
    return () => {
      return (
        <div>
         {ctx.slots.default?.()}
        </div>
      )
    }
  },
})