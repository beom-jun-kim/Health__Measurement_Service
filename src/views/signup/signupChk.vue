<template>
    <div class="login-container">
        <img src="../../../public/img/app_logo_01.png" alt="G-CON Logo" class="logo">
        <div class="page-title">
            <h2>회원가입</h2>
        </div>
        <form class="user-join-chk">
            <p>대상자 입니까? 보호자 입니까?</p>
            <div class="radio-box">
                <input type="radio" id="self" name="userJoinChk">
                <label for="self">대상자</label>
            </div>
            <div class="radio-box">
                <input type="radio" id="protect" name="userJoinChk">
                <label for="protect">보호자</label>
            </div>
            <button type="submit" class="next-btn">다음</button>
        </form>
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
    width: 100%;
}

.user-join-chk {
    width: 100%;
    text-align: center;
}

.user-join-chk p {
    margin: 20px 0 0;
    font-size: var(--font-n-size);
}

.radio-box {
    margin-top: 20px;
}

.radio-box input[type="radio"] {
    /* margin-right: 15px;
    width: 20px;
    height: 20px;
    accent-color: var(--main-color); */

    margin-right: 15px;
    appearance: none;
    border: max(2px, 0.1em) solid var(--input-border-color);
    border-radius: 50%;
    width: 20px;
    height: 20px;
}

.radio-box input[type="radio"]:checked {
  border: 0.4em solid var(--main-color);
}

.radio-box label {
    font-size: var(--font-b-size);
    font-weight: var(--font-b-weight);
}

.qr-hand-img {
    width: 200px;
    margin: 30px 0 20px;
}

.qr-hand-img img {
    max-width: 100%;
}

.page-title h2 {
    font-weight: var(--font-b-weight);
    margin-top: 20px;
}

.next-btn {
    width: 80%;
    padding: 20px 0;
    margin-top: 30px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-b-size);
    color: #fff;
    background-color: var(--main-color);
    cursor: pointer;
    font-weight: var(--font-b-weight);
}
</style>