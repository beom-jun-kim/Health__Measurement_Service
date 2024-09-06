<template>
  <div class="container margin-bottom-zero">
    <div class="position-center">
      <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
      <form class="login-form" @submit.prevent="login">
        <div class="input-group">
          <input type="text" id="username" name="username" v-model="userId" required placeholder="아이디">
        </div>
        <div class="input-group">
          <input type="password" id="password" name="password" v-model="password" required placeholder="비밀번호">
        </div>
        <div class="error-message-cnt-box"v-if="errorMessageCntBox">
          <small>{{ errorMessageCnt }}</small>
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>
      <!-- <div class="sns-login">
        <div class="sns-login-box" @click="redirectToNaver">
          <div class="sns-login-naver">
            <img src="@/assets/img/naver_login.png" alt="">
          </div>
        </div>
        <div class="sns-login-box" @click="redirectToKakao">
          <div class="sns-login-kakao">
            <img src="@/assets/img/kakao_login.png" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 20 19">
              <path fill="#181600"
                d="M10 .111C4.478.111 0 3.59 0 7.878 0 10.545 1.733 12.9 4.367 14.3l-1.111 4.078c-.1.356.31.644.622.433l4.866-3.222c.412.045.823.067 1.256.067 5.522 0 10-3.478 10-7.767 0-4.3-4.478-7.778-10-7.778z" />
            </svg>
            <div class="hidden-box"></div>
          </div>
        </div>
      </div> -->
      <div class="links">
        <RouterLink to="/user/userIdFind">
          <small>아이디 찾기</small>
        </RouterLink> |
        <RouterLink to="/user/userIdFind">
          <small>비밀번호 찾기</small>
        </RouterLink>
      </div>

      <div class="sns-login">
        <div class="sns-title-box">
          <div class="sns-border-flex">
            <div class="sns-border"></div>
            <small>SNS 계정으로 로그인</small>
            <div class="sns-border"></div>
          </div>
        </div>
        <div class="sns-icon-wrap">
          <div class="sns-icon-box" @click="redirectToKakao">
            <img src="@/assets/img/free-icon-kakao-talk-4494622.png" alt="카카오 로그인">
          </div>
          <div class="sns-icon-box" @click="redirectToNaver">
            <img src="@/assets/img/pngwing.com.png" alt="네이버 로그인">
          </div>
        </div>
      </div>
    </div>
    <div class="move-signup">
      <small>스마트 신발 회원이 아니신가요?</small>
      <RouterLink to="/signup/signupView">
        <small style="color: var(--main-color);">회원가입</small>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import UserDataService from '@/api/UserDataService';

const snsBaseURL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_API_SNS_URL_PROD
    : import.meta.env.VITE_APP_API_SNS_URL_LOCAL

export default {
  name: 'userLogin',
  data() {
    return {
      userId: "",
      password: "",
      errorMessageCnt: "",
      errorMessageCntBox: false,
    }
  },
  methods: {
    async login() {
      try {
        const data = {
          userId: this.userId,
          password: this.password,
        }
        await UserDataService.login(data);
        this.$router.push("/signup/welcome");
      } catch (error) {
        console.log("로그인실패", error);
        if (error.response.data.errorMessage) {
          this.errorMessageCntBox = true;
          this.errorMessageCnt = error.response.data.errorMessage;
        }
      }
    },
    redirectToNaver() {
      window.location.href = `${snsBaseURL}/oauth2/authorization/naver`;
    },
    redirectToKakao() {
      window.location.href = `${snsBaseURL}/oauth2/authorization/kakao`;
    },
  },
  async mounted() {
    if (this.$route.query.socialLogin) {
      const response = await UserDataService.refreshToken()
      const newAccessToken = response.headers.authorization
      const tokenData = { accessToken: newAccessToken }
      localStorage.setItem('Authorization', JSON.stringify(tokenData))
      window.location.href = '/home'
    }
    if (this.$route.query.error) {
      alert("카카오 계정에 전화번호가 등록되지 않았습니다. 카카오에서 전화번호를 등록한 후 회원가입을 진행해주세요.");
      const params = new URLSearchParams(window.location.search);
      params.delete('error');
      const newUrl = window.location.origin + window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.location.href = newUrl;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0;
}

.position-center {
  padding: 40px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.login-form {
  width: 100%;
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
  padding: 12px;
  font-size: var(--input-font-size);
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius);
  font-weight: var(--font-t-weight);
}

.login-button {
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--font-n-sec-size);
  color: #fff;
  background-color: var(--main-color);
}

.links {
  margin-top: 20px;
  font-weight: var(--font-t-weight);
  color: var(--light-font-color);
}

.sns-login {
  width: 100%;
  margin-top: 40px;
}

.sns-title-box {
  color: var(--light-font-color);
  font-weight: var(--font-t-weight);
}

.sns-border-flex small {
  width: 100%;
  margin: 0 5px;
  text-align: center;
  white-space: nowrap;
}

.sns-border-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sns-border {
  width: 100%;
  height: 1px;
  background: var(--input-border-color);
}

.sns-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

.sns-icon-box {
  width: 50px;
  height: 50px;
}

.move-signup {
  position: absolute;
  bottom: 50px;
  font-weight: var(--font-t-weight);
}

.move-signup small {
  margin-right: 5px;
  color: var(--light-font-color);
}

.error-message-cnt-box small {
  color: red;
  word-break: keep-all;
}
</style>
