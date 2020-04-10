import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', name: '/404', component: () => import('../views/404.vue') },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  {
    path: '/',
    name: 'home',
    redirect: 'index',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'one',
        name: 'one',
        component: () => import('../views/One.vue')
      },
      {
        path: 'two',
        name: 'two',
        component: () => import('../views/Two.vue')
      },
      {
        path: 'three3-1',
        name: 'three3-1',
        component: () => import('../views/three/Three3-1.vue')
      },
      {
        path: 'three3-2',
        name: 'three3-2',
        component: () => import('../views/three/Three3-2.vue')
      },
      {
        path: 'four4-1',
        name: 'four4-1',
        component: () => import('../views/four/Four4-1.vue')
      },
      {
        path: 'four4-2',
        name: 'four4-2',
        component: () => import('../views/four/Four4-2.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.eleToken
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
// 解决路由下的界面，点击该路由多次时
// 报错：NavigationDuplicated{_name: "NavigationDuplicated", name: "NavigationDuplicated", message: "Navigating to current location ("/one") is not allowed", stack: "Error↵    at new NavigationDuplicated (webpack-int…e_modules/element-ui/lib/mixins/emitter.js:29:22)"}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
