import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      component: () => import('./views/index'),
      children: [
        {
          path: '',
          redirect: '/home'
        },{
          path: '/home',
          name: 'home',
          component: () => import('./views/home')
        },{
          path: '/me',
          name: 'me',
          component: () => import('./views/me')
        },{
          path: '/order',
          name: 'order',
          component: () => import('./views/order')
        },{
          path: '/address',
          name: 'address',
          component: () => import('./views/address')
        },{
          path: '/city',
          name: 'city',
          component: () => import('./views/city')
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    },{
      path: '/search',
      name: 'search',
      component: () => import('./views/search')
    },{
      path: '/shop',
      name: 'shop',
      component: () => import('./views/shops/shop'),
      redirect: '/shop/goods',
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: () => import('./views/shops/goods')
        },{
          path: 'comments',
          name: 'comments',
          component: () => import('./views/shops/comments')
        },{
          path: 'seller',
          name: 'seller',
          component: () => import('./views/shops/seller')
        }
      ]
    }
  ]
})

// 路由守卫，判断有没有登陆
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if(to.path === '/login'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
})

export default router;
