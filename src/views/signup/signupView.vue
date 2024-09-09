<template>
    <div class="container">
        <GoBack :goBackText="goBackText"/>
        <!-- <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo"> -->
        <!-- <div class="page-title">
            <h2>회원가입</h2>
            <p>회원가입을 위한 정보들을 입력해주세요</p>
        </div> -->
        <form class="signup-form" @submit.prevent="userJoin">
            <div class="input-group">
                <div style="display: flex; justify-content: space-between">
                    <label for="username">아이디</label>
                    <span class="idChk" :class="{ 'red': idChk === true, 'blue': idChk === false }">{{ idChkText
                        }}</span>
                </div>
                <input type="text" id="username" name="username" v-model="form.id" required :disabled="verificationSent"
                    maxlength="16" minlength="6" placeholder="6~16자의 영문 혹은 영문+숫자 조합">
                <!-- <button type="button" class="signup-button" :disabled="verificationSent"
                    @click="idCheck(form.id)">중복확인</button> -->
            </div>
            <div class="input-group">
                <div style="display: flex; justify-content: space-between;">
                    <label for="password">비밀번호</label>
                    <span class="passwordChk" :class="{ 'red': passwordChk === true, 'blue': passwordChk === false }">{{
            passwordChkText }}</span>
                </div>
                <input type="password" id="password" name="password" v-model="form.password" required
                    :disabled="verificationSent" maxlength="16" minlength="6" placeholder="비밀번호를 입력하여 주세요">
            </div>
            <div class="input-group">
                <label for="password-confirm">비밀번호 확인</label>
                <input type="password" id="password-confirm" name="password-confirm" v-model="form.pwdChk" required
                    :disabled="verificationSent" placeholder="비밀번호를 다시 한번 입력하여 주세요">
            </div>
            <div class="input-group">
                <div style="display: flex; justify-content: space-between">
                    <label for="name">이름</label>
                    <span class="usernameChk" :class="{ 'red': usernameChk === true, 'blue': usernameChk === false }">{{
            usernameChkText
        }}</span>
                </div>
                <input type="text" id="name" name="name" v-model="form.username" required maxlength="20"
                    :disabled="verificationSent" placeholder="예) 홍지콘">
            </div>
            <div class="input-group">
                <label>성별</label>
                <div class="gender">
                    <div class="gender-box">
                        <input type="radio" id="man" v-model="form.gender" name="genderChk" value="M">
                        <label for="man" class="custom-radio">남자</label>
                    </div>

                    <div class="gender-box">
                        <input type="radio" id="women" v-model="form.gender" name="genderChk" value="F">
                        <label for="women" class="custom-radio">여자</label>
                    </div>
                </div>

                <!-- <select id="gender" v-model="form.gender" required :disabled="verificationSent">
                    <option value="M">남</option>
                    <option value="F">여</option>
                </select> -->
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
            <div class="input-group" style="margin-bottom: 10px;">
                <label for="phone">전화번호</label>
                <input type="tel" id="phone" name="phone" v-model="form.phone" required :disabled="isVerified"
                    placeholder="(-없이 입력)">
                <button v-if="verificationSent === false" type="button" class="signup-button"
                    @click="sendVerificationCode">인증번호 발급</button>
                <button v-if="verificationSent === true" type="button" class="signup-button"
                    @click="sendVerificationCode" :disabled="isVerified">재발급</button>
            </div>
            <div class="input-group" v-if="verificationSent" style="margin:20px 0 10px;">
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
            <button type="submit" class="signup-button" style="border:none;" :disabled="!isVerified">회원가입</button>
        </form>
    </div>
</template>

<script>
import UserDataService from '@/api/UserDataService';
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'SignupView',
    components:{
        GoBack,
    },
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
                gender: "M",
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
            passwordChk: "",
            passwordChkText: "",
            usernameChk: "",
            usernameChkText: "",
            timer: 0,
            isTimerActive: false,
            countdown: null,
            excessPhrase: "",
            goBackText:"회원가입",
        };
    },
    watch: {
        'form.id'(newValue) {
            this.idCheck(newValue)
        },
        'form.password'(newValue) {
            this.passwordCheck(newValue)
        },
        'form.username'(newValue) {
            this.validateUsername(newValue);
        }
    },
    methods: {
        async idCheck(id) {
            if (this.form.id === '') {
                this.idChkText = '';
            }
            const specialCharacters = /[^a-zA-Z0-9]/.test(id);
            if (specialCharacters) {
                this.idChkText = '한글과 특수 문자는 제외하여 주세요';
                this.idChk = true;
                return;
            }
            if (this.form.id.length < 6) {
                this.idChkText = '6자리 이상 입력하여주세요';
                this.idChk = true;
                return;
            }
            if (/^\d+$/.test(this.form.id)) {
                this.idChkText = '숫자로만 아이디를 생성할 수 없습니다';
                this.idChk = true;
                return;
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
        passwordCheck(password) {
            if (this.form.password === '') {
                this.passwordChkText = '';
            }

            const hasLetterAndNumber = /^(?=.*[A-Za-z])(?=.*\d)/.test(password);
            if (!hasLetterAndNumber) {
                this.passwordChkText = '영문과 숫자를 필수로 넣어주세요';
                this.passwordChk = true;
                return;
            }

            if (password.length < 6) {
                this.passwordChkText = '6자리 이상 입력하여주세요';
                this.passwordChk = true;
                return;
            }

            const specialCharactersAllowed = /^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/.test(password);
            if (!specialCharactersAllowed) {
                this.passwordChkText = `!@#$%^&*()_+-=[]{};':"\\|,.<>/?의 특수문자만 포함 할 수 있습니다`;
                this.passwordChk = true;
                return;
            }

            this.passwordChkText = '사용 가능한 비밀번호 입니다';
            this.passwordChk = false;
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
        validateUsername(username) {
            const trimmedUsername = username.trim().replace(/\s+/g, '');
            const isHangulOnly = /^[가-힣]+$/.test(trimmedUsername);
            const isEnglishOnly = /^[a-zA-Z]+$/.test(trimmedUsername);
            const isInvalidUsername = !isHangulOnly && !isEnglishOnly;

            if (username !== trimmedUsername) {
                this.form.username = trimmedUsername;
            }
            if (isInvalidUsername) {
                this.usernameChkText = "특수기호/공백/숫자는 사용불가 합니다";
                this.usernameChk = true;
            } else {
                this.usernameChkText = "사용 가능한 이름입니다.";
                this.usernameChk = false;
            }
        },
        async sendVerificationCode() {
            const phone = Number(this.form.phone);
            if (isNaN(phone)) {
                alert("숫자를 입력하여 주세요");
            } else if (this.idChk === true || this.passwordChk === true || this.usernameChk === true) {
                alert("양식에 맞게 입력하여주세요")
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
                    if (error.response.data.errorCode === "SMS_LIMIT_EXCEEDED") {
                        alert("인증번호 발급 요청 횟수를 초과했습니다. 24시간 후에 다시 시도해주세요")
                        this.verificationSent = false;
                        if (this.countdown) {
                            clearInterval(this.countdown);
                        }
                    }
                    if (error.response.status === 409) {
                        alert("해당 번호로 가입된 사용자가 있습니다")
                    }
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
                    const response = await UserDataService.smsChk(data);
                    if (response.data.verified === true) {
                        this.isVerified = true;
                        alert("인증번호가 확인되었습니다");
                        if (this.countdown) {
                            clearInterval(this.countdown);
                        }
                    } else {
                        alert("인증번호가 일치하지 않습니다");
                    }
                    if (response.data.message === "인증 코드가 일치하지 않습니다. 인증 시도 횟수를 초과했습니다.") {
                        this.excessPhrase = "인증 시도 횟수를 초과했으니 인증번호를 다시 발급받아 주세요"
                        alert(this.excessPhrase);
                        this.verificationSent = false;
                        if (this.countdown) {
                            clearInterval(this.countdown);
                        }
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
    margin-top: 30px;
    max-width: 300px;
}

.input-group {
    margin-bottom: 30px;
}

.input-group label {
    /* width: 100%; */
    display: block;
    margin-bottom: 5px;
    /* font-weight: bold; */
}

.input-group input,
.input-group select {
    width: 100%;
    padding: 5px 0;
    font-size: var(--input-font-size);
    /* border: 1px solid #ccc; */
    border-bottom: 2px solid var(--input-border-color) !important;
    /* border-radius: 5px; */
    box-sizing: border-box;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    font-weight: var(--font-t-weight);
    /* -webkit-appearance: none; */
    -webkit-border-radius: 0;
}

.birth-select {
    display: flex;
    gap: 5px;
}

.gender {
    display: flex;
}

.signup-button {
    /* width: 100%;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: var(--main-color);
    cursor: pointer;
    text-align: center;
    font-weight: bold; */

    width: 100%;
    padding: 15px;
    /* height: 41px; */
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);
    margin-top: 10px;
}

label[for="man"],
label[for="women"] {
    width: 100%;
    margin-right: 20px;
}

.gender-box {
    margin-right: 30px;
}

.gender-box input[type="radio"] {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    display: none;
}

.gender-box .custom-radio::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 17px;
    border: 2px solid var(--input-border-color);
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

.gender-box input[type="radio"]:checked+.custom-radio::before {
    border-color: var(--main-color);
    content: '';
    color: var(--main-color);
    accent-color: var(--main-color);
    text-align: center;
    font-size: var(--font-small-size);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b1a7"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 20.59 7.41 19.17 6l-10 10.17z"/></svg>');
}

.gender-box .custom-radio {
    font-size: var(--font-n-sec-size);
    color: var(--light-font-color);
}

.gender-box input[type="radio"]:checked+.custom-radio {
    color: var(--main-color);
    accent-color: var(--main-color);
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

.passwordChk {
    margin-bottom: 10px;
}

.passwordChk.red {
    color: red;
}

.passwordChk.blue {
    color: blue;
}

.usernameChk.red {
    color: red;
}

.usernameChk.blue {
    color: blue;
}
</style>