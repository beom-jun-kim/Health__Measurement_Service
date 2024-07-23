<template>
    <div class="container">
        <GoBack />
        <div class="add-friend">
            <h3>아이디로 보호자/대상자 추가하기</h3>
            <input type="text" id="userId" name="userId" placeholder="추가할 보호자/대상자 아이디 입력">
            <button class="add-fri-btn">확인</button>
        </div>
        <div class="add-friend">
            <h3>연락처로 보호자/대상자 추가하기</h3>
            <input type="text" id="usePhone" name="usePhone" placeholder="추가할 보호자/대상자 전화번호 입력">
            <button class="add-fri-btn">확인</button>
        </div>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";

export default {
    name: "addFollow",
    components: {
        GoBack,
    }
}
</script>

<style>
.container {
    padding: 20px;
}

.add-friend {
    width: 100%;
}

.add-friend h3 {
    color: var(--main-color);
}

.add-friend input {
    border: 1px solid var(--input-border-color);
    width: 80%;
    height: 35px;
    margin: 10px 10px 30px 0;
    padding: 0 5px;
}

.add-friend button {
    height: 35px;
    padding: 0 10px;
    background: #8c8c8c;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: var(--font-n-size);
    transform: translateY(3px);
}
</style>