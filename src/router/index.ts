import routes from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes
})

let isFirstLoad = true
router.afterEach((to, from) => {
  document.title = `${to.meta.title}`
  if (isFirstLoad) {
    isFirstLoad = false
    to.meta.transition = ''
    return
  }
  if (from.fullPath === '/' && to.fullPath === '/') {
    to.meta.transition = ''
  } else if (from.fullPath.split('?')[0].length < to.fullPath.split('?')[0].length) {
    to.meta.transition = 'slide-left'
  } else {
    to.meta.transition = 'slide-right'
  }
})

export default router
