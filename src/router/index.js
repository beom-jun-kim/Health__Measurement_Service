import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/',
      redirect: '/login/loginChk'
    },
    {
      path: '/login/userLogin',
      name: 'userLogin',
      component: () => import('../views/login/userLogin.vue')
    },
    {
      path: '/login/loginChk',
      name: 'loginChk',
      component: () => import('../views/login/loginChk.vue')
    },
    {
      path: '/signup/signupView',
      name: 'signupView',
      component: () => import('../views/signup/signupView.vue'),
      props: (route) => ({ userType: route.query.userType })
    },
    {
      path: '/user/userIdFind',
      name: 'userIdFind',
      component: () => import('../views/user/userIdFind.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/signup/qr',
      name: 'qr',
      component: () => import('../views/signup/qr.vue')
    },
    {
      path: '/user/myInfo',
      name: 'myInfo',
      component: () => import('../views/user/myInfo.vue')
    },
    {
      path: '/user/secession',
      name: 'secession',
      component: () => import('../views/user/secession.vue')
    },
    {
      path: '/user/mypage',
      name: 'mypage',
      component: () => import('../views/user/mypage.vue')
    },
    {
      path: '/user/report',
      name: 'report',
      component: () => import('../views/user/report.vue')
    },
    {
      path: '/user/report/:id',
      name: 'reportDetail',
      component: () => import('../views/user/report/reportDetail.vue')
    },
    {
      path: '/findContainer',
      name: 'findContainer',
      component: () => import('../views/findContainer.vue')
    },
    {
      path: '/signup/signupChk',
      name: 'signupChk',
      component: () => import('../views/signup/signupChk.vue')
    },
    {
      path: '/userInfo/height',
      name: 'height',
      component: () => import('../views/userInfo/height.vue')
    },
    {
      path: '/userInfo/weight',
      name: 'weight',
      component: () => import('../views/userInfo/weight.vue')
    },
    {
      path: '/signup/welcome',
      name: 'welcome',
      component: () => import('../views/signup/welcome.vue')
    },
  ]
})

export default router
