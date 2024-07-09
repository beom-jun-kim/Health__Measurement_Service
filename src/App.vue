<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/home">
          <div class="bottom-bar-img">
            <img src="../public/img/bottom_menu_01.png" alt="">
          </div>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/mypage">
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
        <RouterLink to="/report">
          <div class="bottom-bar-img">
            <img src="../public/img/bottom_menu_04.png" alt="">
          </div>
          <span>더보기</span>
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header .wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid var(--input-border-color);
  width: 100%;
}

nav {
  width: 100%;
  font-size: var(--font-n-sec-size);
  text-align: center;
  padding: 10px 0;
}

nav a.router-link-exact-active {
  color: var(--main-color);
}

nav a {
  display: inline-block;
  padding: 10px 20px;
}
</style>
