<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
  <RouterView />
  <header v-if="route.path !== '/signup/welcome'">
    <div class="wrapper">
      <nav>
        <RouterLink to="/home">
          <div class="bottom-bar-img">
            <img src="../public/img/bottom_menu_01.png" alt="">
          </div>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/report">
          <div class="bottom-bar-img">
            <img src="../public/img/bottom_menu_02.png" alt="">
          </div>
          <span>측정기록</span>
        </RouterLink>
        <RouterLink to="/findContainer">
          <div class="bottom-bar-img">
            <img src="../public/img/bottom_menu_03.png" alt="">
          </div>
          <span>G-CON 찾기</span>
        </RouterLink>
        <RouterLink to="/user/mypage">
          <div class="bottom-bar-img">
            <img src="../public/img/bottom_menu_04.png" alt="">
          </div>
          <span>내정보</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header .wrapper {}

nav {
  width: 100%;
  border-top: 1px solid var(--input-border-color);
  font-size: var(--font-n-sec-size);
  text-align: center;
  padding: 10px 0;
  white-space: nowrap;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  background: #fff;
}

nav a.router-link-exact-active {
  color: var(--main-color);
}
</style>
