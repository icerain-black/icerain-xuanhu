import { defineComponent, PropType } from 'vue'
import { Center } from '../Center/Centet'
import s from './ComingSoon.module.scss'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'
import { useRouter } from 'vue-router'
export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: () => {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <div class={s.link}>
          <Button onClick={onClick}>返回</Button>
        </div>
      </div>
    )
  }
})

export default ComingSoon