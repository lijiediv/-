import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const home = () => import('../pages/home/home')
const menu = () => import('../pages/menu/menu')
const manger = () => import('../pages/manger/manger')
const role = () => import('../pages/role/role')
const classify = () => import('../pages/classify/classify')
const spec = () => import('../pages/spec/spec')
const goods = () => import('../pages/goods/goods')
const banner = () => import('../pages/banner/banner')
const vip = () => import('../pages/vip/vip')
const seckill = () => import('../pages/seckill/seckill')
Vue.use(Router)




export const indexRouters = [
  {
    path: 'menu',
    component: menu,
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'role',
    component: role,
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'manger',
    component: manger,
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'classify',
    component: classify,
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'spec',
    component: spec,
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'goods',
    component: goods,
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'vip',
    component: vip,
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'banner',
    component: banner,
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },
  {
    path: 'seckill',
    component: seckill,
    name: '秒杀活动',
    beforeEnter: (to, from, next) => {
      if(from.path=='./index/home'){
        next()
      }else{
        next("login")
      }
    }
  },

]

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'home',
          component: home,
          beforeEnter:(to,from,next)=>{
            // console.log(to);
            console.log(from);
            // 这是判断是否从登录进来同时保证用户是登录的状态
            if(from.path=="/login"&&store.state.user.list){
              next()
            }else{
              next("/login")
            }
          }
        },
        {
          path: '',
          redirect: 'home'
        },
        ...indexRouters
        ,
      ]
    },
    // {
    //   path:"/",
    //   component:login
    // },
    {
      path:"*",
      redirect:"login"
    }
  ]
})

//全局首位
router.beforeEach((to,from,next)=>{
  //去登录放行
  if(to.path=='/login'){
    next()
  }

  //去的不是登录,判断用户是否登录，如果登录成功res.data.list  有信息   
  if(store.state.user.list.menus){
    next()
  }else{
    // this.$router.push("/login")
    // next("/login")
  }
})



console.log(store);





export default router