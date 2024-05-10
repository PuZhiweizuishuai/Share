import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
      meta: { title: '分享点啥 - 首页' },
      children:[
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/share-list.vue'),
          meta: { title: '分享点啥 - 首页' }
        },
        {
          path: '/file',
          name: 'File',
          component: () => import('@/views/file-list.vue'),
          meta: { title: '文件列表' }
        },
        {
          path: '/qrcode',
          name: 'QrCode',
          component: () => import('@/views/qr-code.vue'),
          meta: { title: '分享点啥 - 二维码' }
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('@/views/search.vue'),
          meta: { title: '分享点啥 - 搜索' }
        },
        {
          path: '/aes',
          name: 'Aes',
          component: () => import('@/views/aes.vue'),
          meta: { title: '分享点啥 - 加密解密' }
        },
        {
          path: '/setting',
          name: 'Setting',
          component: () => import('@/views/setting.vue'),
          meta: { title: '分享点啥 - 设置' }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About.vue'),
          meta: { title: '关于' }
        },
        {
          path: '/sysinfo',
          name: 'SysInfo',
          component: () => import('../views/sysinfo.vue'),
          meta: { title: '系统信息' }
        },
        {
          path: '/share/share/:id',
          name: 'ShareText',
          component: () => import('../views/share-text.vue'),
          meta: { title: '分享给你的' }
        },
        {
          path: '/share/file/:id',
          name: 'ShareFile',
          component: () => import('../views/share-file.vue'),
          meta: { title: '分享给你的文件' }
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('../views/test.vue'),
          meta: { title: 'test' }
        },
        {
          path: '/404',
          name: '404page',
          component: () => import('@/views/404.vue'),
        },
          // 未知路由重定向
        {
          path: '/:pathMatch(.*)',
          redirect: '/404',
          hidden: true
        }
      ]
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
