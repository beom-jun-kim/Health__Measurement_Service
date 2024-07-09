<template>
    <div class="signup-container">
        <img src="../../../public/img/app_logo_01.png" alt="G-CON Logo" class="logo">
        <div class="page-title">
            <h2>회원가입</h2>
            <p>회원가입을 위한 정보들을 입력해주세요</p>
        </div>
        <form class="signup-form">
            <div class="input-group">
                <label for="username">아이디</label>
                <input type="text" id="username" name="username">
            </div>
            <div class="input-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password">
            </div>
            <div class="input-group">
                <label for="password-confirm">비밀번호확인</label>
                <input type="password" id="password-confirm" name="password-confirm">
            </div>
            <div class="input-group">
                <label for="name">이름</label>
                <input type="text" id="name" name="name">
            </div>
            <div class="input-group">
                <label for="gender">성별</label>
                <select id="gender">
                    <option value="male">남</option>
                    <option value="female">여</option>
                </select>
            </div>
            <div class="input-group">
                <label for="birth">생년월일</label>
                <div class="birth-select">
                    <select id="year">
                        <option value="">년</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select id="month">
                        <option value="">월</option>
                        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                    </select>
                    <select id="day">
                        <option value="">일</option>
                        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="signup-button">회원가입</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SignupView',
    data() {
        return {
            currentYear: new Date().getFullYear(),
            startYear: 1900,
            months: Array.from({ length: 12 }, (v, k) => k + 1),
            days: Array.from({ length: 31 }, (v, k) => k + 1)
        };
    },
    computed: {
        years() {
            const years = [];
            for (let year = this.startYear; year <= this.currentYear; year++) {
                years.push(year);
            }
            return years;
        }
    }
};
</script>

<style scoped>
.signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
}

.logo {
    width: 150px;
    margin-bottom: 20px;
}

.page-title {
    text-align: center;
    margin-bottom: 20px;
}

.page-title h2 {
    margin: 0;
    font-size: var(--font-b-size);
    font-weight: bold;
}

.page-title p {
    margin: 10px 0 0;
    font-size: 16px;
    color: #666;
    white-space: nowrap;
}

.signup-form {
    width: 100%;
    max-width: 300px;
}

.input-group {
    margin-bottom: 25px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.input-group input,
.input-group select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.birth-select {
    display: flex;
    gap: 5px;
}

.signup-button {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #00BFA5;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
}

.signup-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>