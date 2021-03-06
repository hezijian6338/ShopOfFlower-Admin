import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'product',
    meta: { title: '产品', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/product/list'),
        meta: { title: '产品列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/product/create'),
        meta: { title: '创建产品', icon: 'tree' }
      },
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/product/modify'),
        meta: { title: '修改产品', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/sku',
    component: Layout,
    redirect: '/sku/list',
    name: 'sku',
    meta: { title: '规格', icon: 'example' },
    hidden: true,
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/sku/list'),
        meta: { title: '规格列表', icon: 'table' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/sku/create'),
        meta: { title: '创建规格', icon: 'tree' }
      },
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/sku/modify'),
        meta: { title: '修改规格', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: { title: '订单', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', icon: 'table' }
      },
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/order/modify'),
        meta: { title: '修改订单', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
