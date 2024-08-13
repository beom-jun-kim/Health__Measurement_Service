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
          path: '/user/reportList/:id',
          name: 'report',
          component: () => import('../views/user/reportList/report.vue')
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
          path: '/signup/welcome',
          name: 'welcome',
          component: () => import('../views/signup/welcome.vue')
        },
        {
          path: '/user/userInfoEdit',
          name: 'userInfoEdit',
          component: () => import('../views/user/userInfoEdit.vue')
        },
        {
          path: '/follow/addFollow',
          name: 'addFollow',
          component: () => import('../views/follow/addFollow.vue')
        },
        {
          path: '/follow/followList',
          name: 'followList',
          component: () => import('../views/follow/followList.vue')
        },
        {
          path: '/follow/followDetail/:id',
          name: 'followDetail',
          component: () => import('../views/follow/followDetail/followDetail.vue')
        },
        {
          path: '/notification/pushList',
          name: 'pushList',
          component: () => import('../views/notification/pushList.vue'),
          props: true
        },
        {
          path: '/follow/reqFollowList',
          name: 'reqFollowList',
          component: () => import('../views/follow/reqFollowList.vue')
        },
        {
          path: '/follow/reqFollowDetailChk/:id',
          name: 'reqFollowChk',
          component: () => import('../views/follow/reqFollowDetailChk/reqFollowChk.vue'),
          props: true
        },
        {
          path: '/:catchAll(.*)',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue')
        },
        {
          path: 'largeScreen',
          name: 'largeScreen',
          component: () => import('../views/LargeScreen.vue')
        }
      ]
    }
  ]
})

// 쿠키 값을 읽어오는 유틸리티 함수
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('Authorization') !== null

  const publicPages = [
    '/login/userLogin',
    '/login/loginChk',
    '/user/userIdFind',
    '/signup/signupView'
  ]
  const authRequired = !publicPages.includes(to.path)

  // 쿠키에 refresh가 있는지 확인
  const hasRefreshCookie = getCookie('refresh') !== undefined

  // 로그인 페이지로 이동할 때 쿠키에 refresh가 있는 경우 home으로 리다이렉트
  if (to.path === '/login/userLogin' && hasRefreshCookie) {
    return next({ path: '/home' })
  }

  if (authRequired && !isAuthenticated) {
    return next({ path: '/login/userLogin' })
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
