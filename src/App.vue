<template>
  <RouterView />
  <header
    v-if="route.path !== '/signup/welcome' && route.path !== '/login/loginChk' && route.path !== '/user/userIdFind' && route.path !== '/signup/signupView' && route.path !== '/login/userLogin'">
    <div class="wrapper">
      <nav>
        <RouterLink to="/home" :class="{ active: isActive(['/home', '/signup/qr']).value }">
          <div class="bottom-bar-img">
            <img src="@/assets/img/bottom_menu_01.png" alt="">
          </div>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/user/report" :class="{ active: isActive(['/user/report']).value }">
          <div class="bottom-bar-img">
            <img src="@/assets/img/bottom_menu_02.png" alt="">
          </div>
          <span>측정기록</span>
        </RouterLink>
        <RouterLink to="/follow/followList"
          :class="{ active: isActive(['/follow/followList', '/follow/addFollow', '/follow/followDetail','/follow/reqFollowList','/follow/reqFollowDetailChk']).value }">
          <div class="bottom-bar-img">
            <img src="@/assets/img/bottom_menu_05.png" alt="">
          </div>
          <span>친구추가</span>
        </RouterLink>
        <RouterLink to="/findContainer" active-class="active">
          <div class="bottom-bar-img">
            <img src="@/assets/img/bottom_menu_03.png" alt="">
          </div>
          <span>G-CON 찾기</span>
        </RouterLink>
        <RouterLink to="/user/myInfo"
          :class="{ active: isActive(['/user/myInfo', '/user/userInfoEdit', '/user/secession']).value }">
          <div class="bottom-bar-img">
            <img src="@/assets/img/bottom_menu_04.png" alt="">
          </div>
          <span>내정보</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isActive = (paths) => {
  const computedValue = computed(() => paths.some(path => route.path.startsWith(path)));
  return computedValue;
};

</script>

<style scoped>
nav {
  width: 100%;
  border-top: 1px solid var(--input-border-color);
  font-size: var(--font-small-size);
  text-align: center;
  padding: 8px 0;
  white-space: nowrap;
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
}

nav .bottom-bar-img {
  width: 25px;
  margin: 0 auto;
}

nav span {
  font-size: var(--font-small-size);
}

nav a.active {
  color: var(--main-color);
}
</style>
