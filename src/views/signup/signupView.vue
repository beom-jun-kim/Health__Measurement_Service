<template>
    <div class="container">
        <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
        <div class="page-title">
            <h2>회원가입</h2>
            <p>회원가입을 위한 정보들을 입력해주세요</p>
        </div>
        <form class="signup-form" @submit.prevent="userJoin">
            <div class="input-group">
                <div style="display: flex; justify-content: space-between">
                    <label for="username">아이디</label>
                    <span class="idChk" :class="{ 'red': idChk === true, 'blue': idChk === false }">{{ idChkText
                        }}</span>
                </div>
                <input type="text" id="username" name="username" v-model="form.id" required
                    :disabled="verificationSent">
                <!-- <button type="button" class="signup-button" :disabled="verificationSent"
                    @click="idCheck(form.id)">중복확인</button> -->
            </div>
            <div class="input-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" v-model="form.password" required
                    :disabled="verificationSent">
            </div>
            <div class="input-group">
                <label for="password-confirm">비밀번호확인</label>
                <input type="password" id="password-confirm" name="password-confirm" v-model="form.pwdChk" required
                    :disabled="verificationSent">
            </div>
            <div class="input-group">
                <label for="name">이름</label>
                <input type="text" id="name" name="name" v-model="form.username" required :disabled="verificationSent">
            </div>
            <div class="input-group">
                <label for="gender">성별</label>
                <select id="gender" v-model="form.gender" required :disabled="verificationSent">
                    <option value="M">남</option>
                    <option value="F">여</option>
                </select>
            </div>
            <div class="input-group">
                <label for="birth">생년월일</label>
                <div class="birth-select">
                    <select id="year" v-model="form.birth" required :disabled="verificationSent">
                        <option value="">년</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select id="month" v-model="form.month" required :disabled="verificationSent">
                        <option value="">월</option>
                        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                    </select>
                    <select id="day" v-model="form.day" required :disabled="verificationSent">
                        <option value="">일</option>
                        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <label for="phone">전화번호 (-없이 입력)</label>
                <input type="tel" id="phone" name="phone" v-model="form.phone" required :disabled="isVerified">
                <button v-if="verificationSent === false" type="button" class="signup-button"
                    @click="sendVerificationCode">인증번호 발급</button>
                <button v-if="verificationSent === true" type="button" class="signup-button"
                    @click="sendVerificationCode" :disabled="isVerified">재발급</button>
            </div>
            <div class="input-group" v-if="verificationSent">
                <div style="display: flex; justify-content: space-between">
                    <label for="verification-code">인증번호</label>
                    <span v-if="isTimerActive" class="timer">
                        남은 시간: {{ formattedTime }}
                    </span>
                </div>
                <input type="text" id="verification-code" name="verification-code" v-model="form.verificationCode"
                    required :disabled="isVerified">
                <button type="button" class="signup-button" @click="verifyCode" :disabled="isVerified">인증번호 확인</button>
            </div>
            <button type="submit" class="signup-button" :disabled="!isVerified">회원가입</button>
        </form>
    </div>
</template>

<script>
import UserDataService from '@/api/UserDataService';

export default {
    name: 'SignupView',
    data() {
        return {
            currentYear: new Date().getFullYear(),
            startYear: 1900,
            months: Array.from({ length: 12 }, (v, k) => k + 1),
            days: Array.from({ length: 31 }, (v, k) => k + 1),
            form: {
                id: "",
                password: "",
                pwdChk: "",
                username: "",
                gender: "",
                birth: "",
                month: "",
                day: "",
                phone: "",
                verificationCode: "",
            },
            verificationSent: false,
            isVerified: false,
            idChk: "",
            idChkText: "",
            timer: 0,
            isTimerActive: false,
            countdown: null,
        };
    },
    watch: {
        'form.id'(newValue) {
            this.idCheck(newValue)
        }
    },
    methods: {
        async idCheck(id) {
            if (this.form.id === '') {
                this.idChkText = '';
            }
            try {
                const response = await UserDataService.idChk(id);
                this.idChk = response.data.existsUser;
                if (this.idChk === true) {
                    this.idChkText = '이미 존재하는 아이디가 있습니다'
                } else {
                    this.idChkText = '사용 가능한 아이디 입니다'
                }
            } catch (error) {
                console.log("아이디중복체크 실패", error);
            }
        },
        async userJoin() {
            if (this.form.password !== this.form.pwdChk) {
                alert("비밀번호가 일치하지 않습니다");
            }

            const birthday = `${this.form.birth}-${String(this.form.month).padStart(2, '0')}-${String(this.form.day).padStart(2, '0')}`;

            try {
                const data = {
                    userId: this.form.id,
                    password: this.form.password,
                    name: this.form.username,
                    gender: this.form.gender,
                    birthday: birthday,
                    phoneNumber: this.form.phone,
                }
                await UserDataService.createUser(data);
                alert("회원가입이 완료되었습니다");
                this.$router.push("/signup/welcome");
            } catch (error) {
                console.log("회원가입 실패", error);
            }
        },
        async sendVerificationCode() {
            const phone = Number(this.form.phone);
            if (isNaN(phone)) {
                alert("숫자를 입력하여 주세요");
            } else if (this.form.id === ""
                || this.form.password === ""
                || this.form.pwdChk === ""
                || this.form.username === ""
                || this.form.gender === ""
                || this.form.birth === ""
                || this.form.month === ""
                || this.form.day === ""
                || this.form.phone === "") {
                alert("입력칸을 모두 입력하여주세요")
            } else {
                try {
                    const data = {
                        phoneNumber: this.form.phone,
                    }
                    await UserDataService.sms(data);
                    this.verificationSent = true;
                    if (this.countdown) {
                        clearInterval(this.countdown);
                    }
                    this.startTimer();
                    alert("인증번호가 발송되었습니다");
                } catch (error) {
                    console.log("인증번호 발급 실패", error);
                }
            }
        },
        async verifyCode() {
            if (this.form.verificationCode === "") {
                alert("인증번호를 입력하여 주세요")
            } else {
                try {
                    const data = {
                        phoneNumber: this.form.phone,
                        verificationCode: this.form.verificationCode
                    }
                    await UserDataService.smsChk(data);
                    this.isVerified = true;
                    alert("인증번호가 확인되었습니다");
                    if (this.countdown) {
                        clearInterval(this.countdown);
                    }
                } catch (error) {
                    console.log("인증번호 확인 실패", error);
                    this.isVerified = false;
                    alert("인증번호가 올바르지 않습니다");
                }
            }
        },
        startTimer() {
            this.timer = 300;
            this.isTimerActive = true;

            this.countdown = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    clearInterval(this.countdown);
                    this.isTimerActive = false;
                    alert("인증 시간이 만료되었습니다. 다시 인증번호를 요청해주세요.");
                    this.verificationSent = false;
                }
            }, 1000);
        },
    },
    computed: {
        years() {
            const years = [];
            for (let year = this.startYear; year <= this.currentYear; year++) {
                years.push(year);
            }
            return years;
        },
        formattedTime() {
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    },
    beforeUnmount() {
        if (this.countdown) {
            clearInterval(this.countdown);
        }
    },
};
</script>

<style scoped>
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
    background-color: var(--main-color);
    cursor: pointer;
    text-align: center;
    font-weight: bold;
}

.signup-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.idChk.red {
    color: red;
}

.idChk.blue {
    color: blue;
}
</style>