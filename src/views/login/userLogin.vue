<template>
  <div class="login-container">
    <img src="/img/app_logo_01.png" alt="G-CON Logo" class="logo">
    <p class="login-text">아이디, 비밀번호를 입력 후 <span>로그인 버튼</span>을 눌러주세요</p>
    <form class="login-form">
      <div class="input-group">
        <label for="username">아이디</label>
        <input type="text" id="username" name="username">
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password">
      </div>
      <button type="submit" class="login-button">로그인</button>
    </form>
    <div class="links">
      <RouterLink to="/user/userIdFind">아이디 찾기</RouterLink> | <RouterLink to="/user/userPasswordFind">비밀번호 찾기</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userLogin',
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-text {
  word-break: keep-all;
  text-align: center;
}

.login-text span {
  color: var(--main-color);
  font-weight: var(--font-b-weight);
}

.logo {
  width: 150px;
  margin-bottom: 50px;
}

.login-form {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-group label {
  margin-bottom: 5px;
}

.input-group input {
  padding: 10px;
  font-size: var(--font-n-sec-size);
  border: 1px solid var(--input-border-color);
  border-radius: 5px;
}

.login-button {
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: var(--font-n-size);
  color: #fff;
  background-color: var(--main-color);
  cursor: pointer;
}

.links {
  margin-top: 20px;
  font-size: 14px;
}
</style>
