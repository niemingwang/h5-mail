import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '邮箱'
    }
  },
  {
    path: '/mails',
    name: 'mails',
    component: () => import('@/views/Mail/index.vue'),
    meta: {
      title: '邮件'
    }
  },
  {
    path: '/new-mail',
    name: 'newMail',
    component: () => import('@/views/NewMail/index.vue'),
    meta: {
      title: '新邮件'
    }
  },
  {
    path: '/mail',
    redirect() {
      return '/'
    },
    meta: {
      title: '邮件详情'
    },
    children: [
      {
        path: '/mail/:id',
        component: () => import('@/views/MailDetail/index.vue'),
      },
      {
        path: '',
        redirect() {
          return '/'
        }
      }
    ]
  }
]

export default routes
