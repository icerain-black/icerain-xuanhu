import {defineComponent} from "vue";
import { Navbar } from "../Navbar/Navbar";
export const MainLayout = defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <div>
          <nav>
            <Navbar>
              {{
                icon: () => ctx.slots.icon?.(),
                default: () => ctx.slots.title?.(),
              }}
            </Navbar>
          </nav>
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})