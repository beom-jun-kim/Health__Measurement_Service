<template>
    <div class="form-container">
        <h2>회원정보로 찾기</h2>
        <p class="form-text">회원가입시 입력하셨던 이름과 휴대폰번호를 입력하세요.</p>
        <form class="find-id-form">
            <div class="input-group">
                <input type="text" placeholder="이름" v-model="form.name" :disabled="verificationSent" />
            </div>
            <div style="display: flex; justify-content: space-between; gap: 5px;">
                <div class="input-group">
                    <input type="text" placeholder="전화번호 (-없이 입력)" v-model="form.phoneNumber"
                        :disabled="verificationSent" class="input-phone-num"/>
                </div>
                <button v-if="verificationSent === false" type="submit" class="send-code-button"
                    @click="findIdSendVerificationCode">전송</button>
                <button v-if="verificationSent" type="submit" class="send-code-button"
                    @click="findIdSendVerificationCode" :disabled="isVerified">재전송</button>
            </div>
            <div class="input-group" v-if="verificationSent">
                <div style="display: flex; justify-content: space-between; margin: 20px 0 5px;">
                    <label for="verification-code">인증번호</label>
                    <span class="timeOut" v-if="isTimerActive">남은 시간 : {{ formattedTime }}</span>
                </div>
                <!-- <div style="display: flex; justify-content: space-between; align-items: center; gap: 5px; margin-top: 10px;"> -->
                    <input type="text" id="verification-code" name="verification-code" v-model="form.verificationCode"
                        :disabled="isVerified">
                    <button type="button" class="send-code-button02" @click="verifyCode" :disabled="isVerified">아이디 찾기</button>
                <!-- </div> -->
            </div>
        </form>
        <div class="findIdResult" v-if="isVerified">
            <span> 조회된 아이디 : {{ findIdResult.userId }}</span>
        </div>
    </div>
</template>

<script>
import UserDataService from "@/api/UserDataService"

export default {
    name: "FindId",
    data() {
        return {
            form: {
                name: "",
                phoneNumber: "",
                verificationCode: ""
            },
            verificationSent: false,
            isVerified: false,
            findIdResult: "",
            timer: 0,
            isTimerActive: false,
            countdown: null,
            excessPhrase: "",
        }
    },
    methods: {
        async findIdSendVerificationCode(evt) {
            evt.preventDefault();
            try {
                const data = {
                    name: this.form.name,
                    phoneNumber: this.form.phoneNumber,
                }
                await UserDataService.findIdSmsVerification(data);
                this.verificationSent = true;
                this.isVerified = false;
                if (this.countdown) {
                    clearInterval(this.countdown);
                }
                this.timerStart();
                alert("인증번호가 발송되었습니다");
            } catch (error) {
                console.log("인증번호 발송실패", error.response.data.errorMessage)
                if (error.response.data.errorMessage === "사용자를 찾을 수 없습니다.") {
                    alert("사용자를 찾을 수 없습니다 입력한 정보를 다시 확인하여주세요")
                }
                if (error.response.data.errorCode === "SMS_LIMIT_EXCEEDED") {
                    alert("인증번호 발급 요청 횟수를 초과했습니다. 24시간 후에 다시 시도해주세요")
                    this.verificationSent = false;
                    if (this.countdown) {
                        clearInterval(this.countdown);
                    }
                }
            }
        },
        async verifyCode() {
            try {
                const data = {
                    phoneNumber: this.form.phoneNumber,
                    verificationCode: this.form.verificationCode
                }
                const response = await UserDataService.smsChk(data);
                if (response.data.verified === true) {
                    this.isVerified = true;
                    alert("인증번호가 확인되었습니다");
                    if (this.countdown) {
                        clearInterval(this.countdown);
                    }
                    this.getfindId();
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
        },
        async getfindId() {
            try {
                const response = await UserDataService.getfindId(this.form.name, this.form.phoneNumber)
                this.findIdResult = response.data;
            } catch (error) {
                console.log("아이디 찾기 실패", error);
            }
        },
        timerStart() {
            this.timer = 300;
            this.isTimerActive = true;

            this.countdown = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    clearInterval(this.countdown)
                    this.isTimerActive = false;
                    alert("인증번호가 만료되었습니다. 다시 인증번호를 요청해주세요.")
                    this.isVerified = false;
                    this.verificationSent = false;
                }
            }, 1000)
        }
    },
    computed: {
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
.find-id-form {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.input-group {
    margin-bottom: 10px;
    width: 100%;
}

.input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    font-size: var(--input-font-size);
}

.form-text {
    margin: 15px 0;
}

.send-code-button {
    /* width: 100%; */
    padding: 0 15px;
    height: 41px;
    border: 1px solid var(--main-color);
    border-radius: var(--border-radius);
    /* font-size: var(--font-n-sec-size); */
    color: var(--main-color);
    background: none;
    /* background-color: var(--main-color);      */
    /* margin-bottom: 20px; */
}

.send-code-button02 {
    width: 100%;
    padding: 15px;
    /* height: 41px; */
    border: 1px solid var(--main-color);
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);     
    margin-top: 10px;
}

.send-code-button:disabled {
    /* background-color: #ccc; */
    cursor: not-allowed;
    color: #36b1a798;
    border: 1px solid #36b1a798;
}

/* input[id="verification-code"] {
    margin: 10px 0 15px;
} */
     
.findIdResult {
    font-size: var(--font-n-sec-size)
}

.timeOut {
    font-size: var(--input-font-size);
}
</style>