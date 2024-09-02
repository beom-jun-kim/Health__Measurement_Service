<template>
    <div class="form-container">
        <h2>비밀번호 찾기</h2>
        <p class="form-text">회원가입시 입력하셨던 아이디와 이름, 휴대폰번호를 입력하세요.</p>
        <form class="find-password-form">
            <div class="input-group">
                <input type="text" placeholder="아이디" v-model="form.userId" :disabled="verificationSent" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="이름" v-model= "form.name" :disabled="verificationSent" />
            </div>
            <div style="display: flex; justify-content: space-between; gap: 5px;">
                <div class="input-group">
                    <input type="text" placeholder="휴대폰번호" v-model="form.phoneNumber" :disabled="verificationSent" />
                </div>
                <button v-if="verificationSent === false" type="submit" class="send-code-button"
                    @click="findPwSendVerificationCode">전송</button>
                <button v-if="verificationSent" type="submit" class="send-code-button" @click="findPwSendVerificationCode"
                    :disabled="isVerified">재전송</button>
            </div>
            <div class="input-group" v-if="verificationSent">
                <div style="display: flex; justify-content: space-between; margin: 20px 0 5px;">
                    <label for="verification-code">인증번호</label>
                    <span v-if="isTimerActive">남은 시간 : {{ formattedTime }}</span>
                </div>
                <input type="text" id="verification-code" name="verification-code" v-model="form.verificationCode">
                <button :disabled="isVerified" type="button" class="send-code-button02" @click="verifyCode">비밀번호 변경하기</button>
            </div>
            <div class="input-group" v-if="isVerified">
                <label for="postPassword">비밀번호 입력하기</label>
                <input type="password" id="postPassword" name="postPassword" placeholder="변경할 비밀번호 입력"
                    v-model="form.password">
                <input type="password" id="postPasswordChk" name="postPasswordChk" placeholder="비밀번호 확인"
                    v-model="form.passwordChk">
                <button type="button" class="send-code-button" @click="changePw">비밀번호 변경</button>
            </div>
        </form>
    </div>
</template>

<script>
import UserDataService from "@/api/UserDataService"

export default {
    name: "FindPassword",
    data() {
        return {
            form: {
                userId: "",
                name: "",
                phoneNumber: "",
                verificationCode: "",
                password: "",
                passwordChk: "",
            },
            verificationSent: false,
            isVerified: false,
            timer: 0,
            isTimerActive: false,
            countdown: null,
            excessPhrase: "",
        }
    },
    methods: {
        async findPwSendVerificationCode(evt) {
            evt.preventDefault();
            try {
                const data = {
                    name: this.form.name,
                       userId: this.form.userId,
                    phoneNumber: this.form.phoneNumber,
                }
                await UserDataService.findIdSmsVerification(data);
                this.verificationSent = true;
                if (this.countdown) {
                    clearInterval(this.countdown);
                }
                this.timerStartPassword();
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
                    if (this.countdown) {
                        clearInterval(this.countdown);
                    }
                    this.isVerified = true;
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
                alert("인증번호가 올바르지 않습니다");
                this.isVerified = false;
            }
        },
        async changePw() {
            if (this.form.password !== this.form.passwordChk) {
                alert("입력한 비밀번호가 일치하지 않습니다")
            } else {
                if (confirm("비밀번호를 변경하시겠습니까?")) {
                    try {
                        const data = {
                            password: this.form.password,
                            userId: this.form.userId,
                            phoneNumber: this.form.phoneNumber,
                        }
                        await UserDataService.postUserPw(data)
                        alert("변경되었습니다");
                        this.$router.push("/login/userLogin")
                    } catch (error) {
                        console.log("비밀번호 패치 실패", error);
                    }
                }
            }
        },
        timerStartPassword() {
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
.find-password-form {
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
    font-size: var(--input-font-size);
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    border: 1px solid var(--input-border-color);
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
    padding: 12px;
    /* height: 41px; */
    border: 1px solid var(--main-color);
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);     
    margin-top: 10px;
}

.send-code-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* input[id="verification-code"] {
    margin: 10px 0 15px;
} */

input[id="postPassword"] {
    margin-top: 10px;
}

input[id="postPassword"],
input[id="postPasswordChk"] {
    margin-bottom: 15px;
}
</style>