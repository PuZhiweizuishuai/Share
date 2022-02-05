import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { title: '分享点啥 - 首页' },
    children: [
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
        meta: { title: '文件列表 - 分享点啥' }
      },
      {
        path: '/about',
        name: 'About',
        meta: { title: '关于 - 分享点啥' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      {
        path: '/search',
        name: 'Search',
        meta: { title: '搜索结果' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/search.vue')
      },
      {
        path: '/qrcode',
        name: 'QrCode',
        meta: { title: '二维码分享' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/qr-code.vue')
      },
      {
        path: '/aes',
        name: 'AES',
        meta: { title: '加密解密' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/aes.vue')
      },
      {
        path: '/setting',
        name: 'Setting',
        meta: { title: '设置' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/setting.vue')
      },
      {
        path: '*',
        name: 'error',
        meta: { title: '404' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/404.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
