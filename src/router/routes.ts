import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '邮箱',
      transition: 'slide-left'
    }
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: () => import('@/views/Inbox/index.vue'),
    meta: {
      title: '收件箱'
    }
  },
  {
    path: '/inbox/:id',
    component: () => import('@/views/MailDetail/index.vue'),
    meta: {
      title: '邮件详情'
    }
  },
  {
    path: '/star',
    name: 'star',
    component: () => import('@/views/Inbox/index.vue'),
    meta: {
      title: '星标邮件'
    }
  },
  {
    path: '/draft',
    name: 'draft',
    component: () => import('@/views/Inbox/index.vue'),
    meta: {
      title: '草稿箱'
    }
  },
  {
    path: '/sent',
    name: 'sent',
    component: () => import('@/views/Inbox/index.vue'),
    meta: {
      title: '已发送'
    }
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('@/views/Inbox/index.vue'),
    meta: {
      title: '废纸篓'
    }
  },
]

export default routes
