<template>
  <div class="login-container margin-bottom-zero">
    <img src="@/assets/img/app_logo_01.png" alt="G-CON Logo" class="logo">
    <div class="login-btn-wrap">
      <RouterLink to="/login/userLogin">
        <button class="login-button">
          <span>로그인</span>
          <div class="img-box">
            <img src="@/assets/img/app_icon_login.png" alt="G-CON Login" class="logo">
          </div>
        </button>
      </RouterLink>
      <RouterLink to="/signup/signupView">
        <button class="signup-button">
          <span>회원가입</span>
          <div class="img-box">
            <img src="@/assets/img/app_icon_signup.png" alt="G-CON Login" class="logo">
          </div>
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginChk',
};
</script>

<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.login-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-button,
.signup-button {
  width: 300px;
  padding: 15px 40px;
  margin: 10px 0;
  border: 2px solid var(--main-color);
  border-radius: 10px;
  font-size: var(--font-n-size);
  color: var(--main-color);
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-button {
  background-color: var(--main-color);
  color: #fff;
}

.login-button:hover,
.signup-button:hover {
  opacity: 0.9;
}

button .img-box {
  width: 30px;
  height: 30px;
}

button .img-box img {
  width: 100%;
}

button span {
  margin-right: 10px;
}
</style>