<template>
    <div class="container">
        <img src="@/assets/img/app_logo_01.png" alt="G-CON Logo" class="logo">
        <div class="page-title">
            <h2>회원가입</h2>
        </div>
        <form class="user-join-chk" @submit.prevent="joinPageMove">
            <p>대상자 입니까? 보호자 입니까?</p>
            <div class="radio-box">
                <input type="radio" id="self" name="userJoinChk" v-model="userType">
                <label for="self">대상자</label>
            </div>
            <div class="radio-box">
                <input type="radio" id="protect" name="userJoinChk" v-model="userType">
                <label for="protect">보호자</label>
            </div>
            <button type="submit" class="next-btn">다음</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'signupChk',
    data() {
        return {
            userType: null
        }
    },
    methods: {
        joinPageMove() {
            if (this.userType) {
                this.$router.push("/signup/signupView");
            } else {
                alert("대상자 또는 보호자를 선택해주세요");
            }
        }
    }
};
</script>

<style scoped>
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
    font-size: var(--font-b-size);
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