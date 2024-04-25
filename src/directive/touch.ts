import { DirectiveBinding } from "vue";

const touched = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const [to, from] = binding.value
    el.ontouchstart = () => {
      el.style.backgroundColor = to
    }
    el.ontouchend = () => {
      el.style.backgroundColor = from
    }
  },
  unmounted(el: HTMLElement) {
    // 移除事件监听
    el.ontouchstart = null
    el.ontouchend = null
  }
}

export default touched
