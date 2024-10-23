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
                        :disabled="verificationSent" class="input-phone-num" />
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

                <input type="text" id="verification-code" name="verification-code" v-model="form.verificationCode"
                    :disabled="isVerified">
                <button type="button" class="send-code-button02" @click="verifyCode" :disabled="isVerified">아이디
                    찾기</button>

            </div>
        </form>
        <div class="findIdResult" v-if="isVerified && findIdModal">
            <div class="close-btn" @click="closeBtn">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px"
                    height="20px" viewBox="0 -0.5 21 21" version="1.1">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -240.000000)" fill="#000000">
                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                <polygon id="close-[#1511]"
                                    points="375.0183 90 384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446">
                                </polygon>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="result-box">
                <div class="gcon-icon-img">
                    <img src="@/assets/img/favicon_48.png" alt="gcon icon">
                </div>
                <div class="find-id-wrap">
                    <div class="smart-shoes-id">
                        <p class="smart-shoes-id-left">가입된 아이디</p>
                        <p class="">{{ findIdResult.userId === false ? "조회된 아이디가 없습니다" : findIdResult.userId }}</p>
                    </div>
                    <div class="smart-sns-id">
                        <p class="smart-shoes-id-left">연결된 SNS 계정</p>
                        <p class="smart-sns-id-title">카카오 아이디 <span class="spa">|</span> {{ findIdResult.naverId ===
                            null ?
                            "연결된 아이디가 없습니다" : findIdResult.naverId }}</p>
                        <p class="smart-sns-id-title">네이버 아이디 <span class="spa">|</span> {{ findIdResult.kakaoId ===
                            null ?
                            "연결된 아이디가 없습니다" : findIdResult.kakaoId }}</p>
                    </div>
                </div>
            </div>
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
            findIdModal: false,
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
                    alert("인증번호가 확인되었습니다");
                    this.isVerified = true;
                    this.findIdModal = true;
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
                console.log("dfdfdfdfdf", this.findIdResult);
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
        },
        closeBtn() {
            this.findIdModal = false;
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
    padding: 0 15px;
    height: 41px;
    border: 1px solid var(--main-color);
    border-radius: var(--border-radius);
    color: var(--main-color);
    background: none;
}

.send-code-button02 {
    width: 100%;
    padding: 15px;
    border: 1px solid var(--main-color);
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);
    margin-top: 10px;
}

.send-code-button:disabled {
    cursor: not-allowed;
    color: #36b1a798;
    border: 1px solid #36b1a798;
}

.send-code-button02:disabled {
    background-color: #36b1a798;
    cursor: not-allowed;
    border: none;
}

.timeOut {
    font-size: var(--input-font-size);
}

.findIdResult {
    padding: 20px 20px 0 20px;
    /* display: flex; */
    /* margin-top: 20px; */
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
}

.result-box {
    border: 1px solid var(--input-border-color);
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    padding: 20px;
}

.find-id-wrap {
    width: 100%;
}

.gcon-icon-img {
    width: 25px;
    margin-right: 10px;
    vertical-align: middle;
}

.smart-shoes-id {
    border-bottom: 1px solid var(--input-border-color);
    padding: 0 20px 20px 0;
}

.smart-sns-id {
    padding: 20px 0 0;
}

.smart-shoes-id-left {
    margin-bottom: 10px;
}

.smart-sns-id-title {
    font-size: var(--input-font-size);
}

.spa {
    color: var(--light-font-color);
    margin: 0 5px;
}
</style>