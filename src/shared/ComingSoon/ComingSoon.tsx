import { defineComponent, PropType } from 'vue'
import { Center } from '../Center/Centet'
import s from './ComingSoon.module.scss'
import { Icon } from '../Icon/Icon'
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: () => {
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})