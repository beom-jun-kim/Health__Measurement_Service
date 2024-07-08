<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/mypage">측정기록</RouterLink>
        <RouterLink to="/findContainer">G-CON 찾기</RouterLink>
        <RouterLink to="/report">더보기</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header .wrapper {
  position: absolute;
  bottom: 0;
  border-top: 1px solid #000;
  width: 100%;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

/* nav a:first-of-type {
  border: 0;
} */

</style>
