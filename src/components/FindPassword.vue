<template>
    <div class="form-container">
        <h2>비밀번호 찾기</h2>
        <p class="form-text">회원가입시 입력하셨던 아이디와 이름, 휴대폰번호를 입력하세요.</p>
        <form class="find-password-form">
            <div class="input-group">
                <input type="text" placeholder="아이디" v-model="form.userId" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="이름" v-model="form.name" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="휴대폰번호" v-model="form.phoneNumber" />
            </div>
            <button type="submit" class="send-code-button" @click="findPwSendVerificationCode">인증번호 발송</button>
            <div class="input-group" v-if="verificationSent">
                <label for="verification-code">인증번호</label>
                <input type="text" id="verification-code" name="verification-code" v-model="form.verificationCode">
                <button type="button" class="send-code-button" @click="verifyCode">인증번호 확인</button>
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
                alert("인증번호가 확인되었습니다");
                this.isVerified = true;
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
                    } catch (error) {
                        console.log("비밀번호 패치 실패", error);
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
.find-password-form {
    display: flex;
    flex-direction: column;
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

.form-text {
    margin: 15px 0;
}

.send-code-button {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: var(--main-color);
    margin-bottom: 20px;
}

input[id="verification-code"] {
    margin: 10px 0 15px;
}

input[id="postPassword"] {
    margin-top: 10px;
}

input[id="postPassword"],
input[id="postPasswordChk"] {
    margin-bottom: 15px;
}
</style>