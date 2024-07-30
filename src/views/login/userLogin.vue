<template>
  <div class="container margin-bottom-zero">
    <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
    <p class="login-text">아이디, 비밀번호를 입력 후<br><span>로그인 버튼</span>을 눌러주세요</p>
    <form class="login-form" @submit.prevent="login">
      <div class="input-group">
        <label for="username">아이디</label>
        <input type="text" id="username" name="username" v-model="userId" required>
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>
      <button type="submit" class="login-button">로그인</button>
    </form>
    <div class="login-sns">
      <!-- <div class="login-sns-naver">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 20 20">
          <path fill="#fff"
            d="M13.166 10.626L6.574 1.111H1.111V18.89h5.723V9.374l6.592 9.515h5.463V1.111h-5.723v9.515z" />
        </svg>
      </div> -->
      <!-- <div class="login-sns-kakao">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 20 19">
          <path fill="#000"
            d="M10 .111C4.478.111 0 3.59 0 7.878 0 10.545 1.733 12.9 4.367 14.3l-1.111 4.078c-.1.356.31.644.622.433l4.866-3.222c.412.045.823.067 1.256.067 5.522 0 10-3.478 10-7.767 0-4.3-4.478-7.778-10-7.778z" />
        </svg>
      </div> -->
    </div>
    <div class="sns-login">
      <div class="sns-login-box">
        <div class="sns-login-naver">
          <img src="@/assets/img/naver_login.png" alt="">
        </div>
      </div>
      <div class="sns-login-box">
        <div class="sns-login-kakao">
          <img src="@/assets/img/kakao_login.png" alt="">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 20 19">
            <path fill="#181600"
              d="M10 .111C4.478.111 0 3.59 0 7.878 0 10.545 1.733 12.9 4.367 14.3l-1.111 4.078c-.1.356.31.644.622.433l4.866-3.222c.412.045.823.067 1.256.067 5.522 0 10-3.478 10-7.767 0-4.3-4.478-7.778-10-7.778z" />
          </svg>
          <div class="hidden-box"></div>
        </div>
      </div>
    </div>
    <div class="links">
      <RouterLink to="/user/userIdFind">아이디 찾기</RouterLink> | <RouterLink to="/user/userIdFind">비밀번호 찾기</RouterLink>
    </div>
  </div>
</template>

<script>
import UserDataService from '@/api/UserDataService';

export default {
  name: 'userLogin',
  data() {
    return {
      userId: "",
      password: "",
    }
  },
  methods: {
    async login() {
      try {
        const data = {
          userId: this.userId,
          password: this.password,
        }
        const response = await UserDataService.login(data);
        console.log("로그인성공", response);
        this.$router.push("/signup/welcome");
      } catch (error) {
        console.log("로그인실패", error);
        if (error.response.data === "Invalid password" || error.response.data.includes("subject not found with userid")) {
          alert("아이디 또는 비밀번호가 잘못되었습니다");
        }
      }
    }
  }
};
</script>

<style scoped>
.login-text {
  word-break: keep-all;
  text-align: center;
}

.login-text span {
  color: var(--main-color);
  font-weight: var(--font-b-weight);
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
  font-size: var(--font-n-sec-size);
}

/* .login-sns-naver,
.login-sns-kakao {
  border-radius: 50%;
  text-align: center;
  width: 55px;
  height: 55px;
  box-sizing: border-box;
  line-height: 67px;
  margin-top: 20px;
}

.login-sns-naver {
  background: #1ec800;
}

.login-sns-kakao {
  background: #fee500;
}

.login-sns {
  display: flex;
  gap: 20px;
} */

.sns-login {
  margin-top: 20px;
}

.sns-login-box {
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 300px;
}

.sns-login-box:first-child {
  background: #03c75a;
  height: 53.33px;
  margin-bottom: 10px;
}

.sns-login-box:last-child {
  background: #fee500;
  height: 53.33px;
  line-height: 90.5px;
}

.sns-login .sns-login-naver,
.sns-login .sns-login-kakao {
  width: 200px;
}

.sns-login-kakao {
  position: relative;
}

.sns-login-kakao svg {
  position: absolute;
  top: 50%;
  left: 32px;
  transform: translateY(-50%);
  z-index: 100;
}

.hidden-box {
  background: #fee500;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
