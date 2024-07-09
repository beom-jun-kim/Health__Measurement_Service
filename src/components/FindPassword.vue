<template>
    <div class="form-container">
        <h2>비밀번호 찾기</h2>
        <p class="form-text">회원가입시 입력하셨던 아이디와 이름, 휴대폰번호를 입력하세요.</p>
        <form class="find-password-form">
            <div class="input-group">
                <input type="text" placeholder="아이디" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="이름" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="휴대폰번호" />
            </div>
            <button type="submit" class="send-code-button">임시 비밀번호 발송</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "FindPassword",
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
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-color: #00BFA5;
    cursor: pointer;
}
</style>