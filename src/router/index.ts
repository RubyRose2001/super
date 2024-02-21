import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/layout/index.vue'
import { asyncModules } from '@/utils/asyncModules'
const arr = [
  {
    path: '/',
    name: '',
    redirect: '/',
    // which is lazy-loaded when the route is visited.
    component: Layout,
    meta: {
      title: '通用信息'
    },
    children: [{
      path: '',
      name: '',
      component: HomeView,
      meta: {
        color: 'red',
        title: '首页',
        neverKeepAlive: true,
        hiddenTab: true,
      }
    }, {
      path: '/about',
      name: '',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'super',
        ispane: true,
      },
    }],
  },
  {
  importHttp: '/test',
  path: '/sub',
  name: 'sub',
  redirect: '/test',
  meta: {
    title: 'sub集合',
    ispane: true,
  },
  component: Layout,
  children: [{
    importHttp: '/test',
    path: '/inputtt',
    name: 'inputtt',
    component: () => import('auth_settings/test'),
    meta: {
      title: 'b',
      async: true,
      ispane: true,
    }
  },{
    importHttp: '/test1',
    path: '/inputtt1',
    name: 'inputtt1',
    component: () => import('auth_settings/roles'),
    meta: {
      title: 'c',
      async: true,
      ispane: true,
    }
  },{
    importHttp: '/test2',
    path: '/inputtt2',
    name: 'inputtt2',
    component: () => import('auth_settings/user'),
    meta: {
      title: 'd',
      async: true,
      ispane: true,
    }
  }],
}]
// children: [{
//   importHttp: 'test',
//   path: 'test',
//   name: 'test',
//   component: () => import('home/test'),
//   meta: {
//     title: 'b',
//     async: true,
//     ispane: true,
//   }
// }],
export const constantRoutes = [{
  path: '/:404*',
  name: '404',
  hidden: true,
  meta: {
    title: '404',
  },
  component: () => import('../views/404.vue')
}]
export const asyncComponent:any[] = asyncModules(arr)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...asyncComponent,
    ...constantRoutes
  ]
})
router.beforeEach((to, from, next) => {
  next()
});
export default router
