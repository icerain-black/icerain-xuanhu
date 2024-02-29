import { defineComponent, PropType, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { Icon, IconProps } from '../Icon/Icon';
import s from './Overlay.module.scss';
import { Dialog } from 'vant';
import { useMeStore } from '../../stores/meStore';
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props) => {
    const route = useRoute()
    const router = useRouter()
    const meStore = useMeStore()

    const close = () => {
      props.onClose?.()
    }
    const onClickLogOut = () => {
      Dialog.confirm({
        title:"确认",
        message:"您真的要退出登录吗?"
      }).then(() => {
        localStorage.removeItem("jwt")
        meStore.$reset()
        router.push("/sign_in")    
      })
    }

    const userInfo = ref<User>()

    meStore.mePromise?.then(res => {
      userInfo.value = res.data.resource
    })

    const navList:{text:string,icon:IconProps["name"],to:string}[] = [
      {text:"账本列表",icon:"fox",to:"/items"},
      {text:"统计图表",icon:"charts",to:"/statistics"},
      {text:"导出数据",icon:"export",to:"/export"},
      {text:"记账提醒",icon:"notify",to:"/notify"}
    ]
    
    return () => <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.currentUser} >
          {userInfo.value?.email ?
            <div class={s.user_info}>
              <h2>{userInfo.value.email}</h2>
              <p onClick={onClickLogOut}>点击这里注销</p>
            </div>
            :
            <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
              <h2>未登录用户</h2>
              <p>点击这里登录</p>
            </RouterLink>
          }
        </section>
        <nav>
          <ul class={s.action_list}>
            {navList.map(item => {
              return (
              <li>
                <RouterLink to={item.to} class={[s.action,route.fullPath === item.to && s.isLink]}>
                  <Icon name={item.icon} class={s.icon}/>
                  <span>{item.text}</span>
                </RouterLink>
              </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  }
})

export const OverlayIcon = defineComponent({
  setup() {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };
    return () => {
      return (
        <>
          <Icon name="menu" class={s.navIcon} onClick={onClickMenu}></Icon>
          {refOverlayVisible.value && (
            <Overlay onClose={() => (refOverlayVisible.value = false)} />
          )}
        </>
      )
    }
  },
})