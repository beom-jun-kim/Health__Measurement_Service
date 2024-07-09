<template>
    <div class="find-id-container">
      <div class="tab-menu">
        <RouterLink to="/find-id" class="active-tab">아이디 찾기</RouterLink>
        <RouterLink to="/find-password" class="inactive-tab">비밀번호 찾기</RouterLink>
      </div>
      <hr class="divider"/>
      <div class="form-container">
        <h2>회원정보로 찾기</h2>
        <p>회원가입시 입력하셨던 이름과 휴대폰번호를 입력하세요.</p>
        <form class="find-id-form">
          <div class="input-group">
            <input type="text" placeholder="이름" />
          </div>
          <div class="input-group">
            <input type="text" placeholder="휴대폰번호" />
          </div>
          <button type="submit" class="send-code-button">인증번호 발송</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FindIdView',
  };
  </script>
  
  <style scoped>
  .find-id-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    height: 100vh;
  }
  
  .tab-menu {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .tab-menu a {
    padding: 10px 20px;
    text-decoration: none;
    color: #aaa;
    font-weight: bold;
    border-bottom: 2px solid transparent;
  }
  
  .active-tab {
    color: #00BFA5;
    border-bottom: 2px solid #00BFA5;
  }
  
  .divider {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  
  .form-container {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
  
  .find-id-form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .send-code-button {
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #00BFA5;
    cursor: pointer;
  }
  
  .bottom-nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #ccc;
    background-color: #f8f8f8;
    padding: 10px 0;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
  }
  
  .nav-item img {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }
  
  .nav-item span {
    font-size: 12px;
  }
  </style>
  