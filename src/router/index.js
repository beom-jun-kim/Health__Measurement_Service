import { createRouter, createWebHistory } from 'vue-router'
import Resize from '../views/Resize.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Resize,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/login/UserLogin',
          name: 'UserLogin',
          component: () => import('../views/login/UserLogin.vue')
        },
        {
          path: '/login/LoginChk',
          name: 'LoginChk',
          component: () => import('../views/login/LoginChk.vue')
        },
        {
          path: '/signup/SignupView',
          name: 'SignupView',
          component: () => import('../views/signup/SignupView.vue'),
          props: (route) => ({ userType: route.query.userType })
        },
        {
          path: '/user/UserIdFind',
          name: 'UserIdFind',
          component: () => import('../views/user/UserIdFind.vue')
        },
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/signup/Gender',
          name: 'Gender',
          component: () => import('../views/signup/Gender.vue')
        },
        {
          path: '/signup/QrCode',
          name: 'QrCode',
          component: () => import('../views/signup/QrCode.vue')
        },
        {
          path: '/user/MyInfo',
          name: 'MyInfo',
          component: () => import('../views/user/MyInfo.vue')
        },
        {
          path: '/user/Secession',
          name: 'Secession',
          component: () => import('../views/user/Secession.vue')
        },
        {
          path: '/user/Mypage',
          name: 'Mypage',
          component: () => import('../views/user/Mypage.vue')
        },
        {
          path: '/user/ReportList/:id',
          name: 'Report',
          component: () => import('../views/user/reportList/Report.vue')
        },
        {
          path: '/user/Report/:id',
          name: 'ReportDetail',
          component: () => import('../views/user/report/ReportDetail.vue')
        },
        {
          path: '/user/WalkReport/:id',
          name: 'WalkReport',
          component: () => import('../views/user/walkReport/WalkReport.vue'),
          meta: { transition: 'slide-fade' }
        },
        {
          path: '/FindContainer',
          name: 'FindContainer',
          component: () => import('../views/FindContainer.vue')
        },
        {
          path: '/signup/Welcome',
          name: 'Welcome',
          component: () => import('../views/signup/Welcome.vue')
        },
        {
          path: '/user/UserInfoEdit',
          name: 'UserInfoEdit',
          component: () => import('../views/user/UserInfoEdit.vue')
        },
        {
          path: '/follow/AddFollow',
          name: 'AddFollow',
          component: () => import('../views/follow/AddFollow.vue')
        },
        {
          path: '/follow/FollowList',
          name: 'FollowList',
          component: () => import('../views/follow/FollowList.vue')
        },
        {
          path: '/follow/FollowDetail/:id',
          name: 'FollowDetail',
          component: () => import('../views/follow/followDetail/FollowDetail.vue')
        },
        {
          path: '/notification/PushList',
          name: 'PushList',
          component: () => import('../views/notification/PushList.vue'),
          props: true
        },
        {
          path: '/follow/ReqFollowList',
          name: 'ReqFollowList',
          component: () => import('../views/follow/ReqFollowList.vue')
        },
        {
          path: '/follow/ReqFollowDetailChk/:id',
          name: 'ReqFollowChk',
          component: () => import('../views/follow/reqFollowDetailChk/ReqFollowChk.vue'),
          props: true
        },
        {
          path: '/:catchAll(.*)',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue')
        },
        {
          path: '/LargeScreen',
          name: 'LargeScreen',
          component: () => import('../views/LargeScreen.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('Authorization') !== null

  const publicPages = [
    '/login/userLogin',
    '/login/loginChk',
    '/user/userIdFind',
    '/signup/signupView'
  ]
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isAuthenticated && window.innerWidth < 800) {
    next({ path: '/login/userLogin' })
  }

  if (!authRequired && isAuthenticated) {
    return next({ path: '/home' })
  }

  if (window.innerWidth > 800) {
    if (from.path === '/largeScreen') {
      window.location.reload()
    }
  }

  next()
})

export default router
