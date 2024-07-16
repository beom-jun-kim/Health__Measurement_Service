<template>
    <div class="form-container">
        <h2>회원정보로 찾기</h2>
        <p class="form-text">회원가입시 입력하셨던 이름과 휴대폰번호를 입력하세요.</p>
        <form class="find-id-form">
            <div class="input-group">
                <input type="text" placeholder="이름" />
            </div>
            <div class="input-group">
                <input type="text" placeholder="휴대폰번호" />
            </div>
            <button type="submit" class="send-code-button">인증번호 발송</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "FindId",
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
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-n-size);
    color: #fff;
    background-color: var(--main-color);
    cursor: pointer;
}
</style>