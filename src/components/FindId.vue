<template>
    <div class="form-container">
        <h2>회원정보로 찾기</h2>
        <p class="form-text">회원가입시 입력하셨던 이름과 휴대폰번호를 입력하세요.</p>
        <form class="find-id-form">
            <div class="input-group">
                <input type="text" placeholder="이름" v-model="form.name" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="휴대폰번호" v-model="form.phoneNumber" />
            </div>
            <button type="submit" class="send-code-button" @click="findIdSendVerificationCode">인증번호 발송</button>
            <div class="input-group" v-if="verificationSent">
                <label for="verification-code">인증번호</label>
                <input type="text" id="verification-code" name="verification-code" v-model="form.verificationCode">
                <button type="button" class="send-code-button" @click="verifyCode">인증번호 확인</button>
            </div>
        </form>
        <div class="findIdResult" v-if="isVerified">
            <span> 찾은 아이디 : {{ findIdResult.userId }}</span>
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
                alert("인증번호가 발송되었습니다");
            } catch (error) {
                console.log("인증번호 발송실패", error.response.data.errorMessage)
                if (error.response.data.errorMessage === "사용자를 찾을 수 없습니다.") {
                    alert("사용자를 찾을 수 없습니다 입력한 정보를 다시 확인하여주세요")
                }
            }
        },
        async verifyCode() {
            try {
                const data = {
                    phoneNumber: this.form.phoneNumber,
                    verificationCode: this.form.verificationCode
                }
                await UserDataService.smsChk(data);
                this.isVerified = true;
                alert("인증번호가 확인되었습니다");
                this.getfindId();
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
        }
    }
};
</script>

<style scoped>
.find-id-form {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.input-group {
    margin-bottom: 15px;
}

.input-group input {
    width: 100%;
    padding: 10px;
    font-size: var(--font-n-sec-size);
    border: 1px solid var(--input-border-color);
    border-radius: 5px;
}

.form-text {
    margin: 15px 0;
}

.send-code-button {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-n-size);
    color: #fff;
    background-color: var(--main-color);
    cursor: pointer;
    margin-bottom: 20px;
}

input[id="verification-code"] {
    margin: 10px 0 15px;
}
</style>