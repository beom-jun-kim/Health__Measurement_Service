import { createRouter, createWebHistory } from 'vue-router'
import UserDataService from '@/api/UserDataService'
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

router.beforeEach(async (to, from, next) => {
  try {
    const response = await UserDataService.getUserInfo()
    if (response.data.userSid !== null) {
      if (
        to.path === '/login/loginChk' ||
        to.path === '/login/userLogin' ||
        to.path === '/user/userIdFind' ||
        to.path === '/signup/signupView'
      ) {
        next({ path: '/home' })
      } else {
        next()
      }
    } else {
      if (
        to.path !== '/login/loginChk' &&
        to.path !== '/login/userLogin' &&
        to.path !== '/user/userIdFind' &&
        to.path !== '/signup/signupView'
      ) {
        next({ path: '/login/loginChk' })
      } else {
        next()
      }
    }
  } catch (error) {
    console.error('경로 이동 실패:', error)
    next()
  }
})

export default router
