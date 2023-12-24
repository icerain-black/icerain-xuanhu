import {defineComponent} from "vue";
export const First = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <div>
          欢迎页面1
        </div>
      )
    }
  },
})