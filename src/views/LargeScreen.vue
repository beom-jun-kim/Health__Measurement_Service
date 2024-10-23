<template>
    <div class="width-container">
        <h1>화면 크기 초과</h1>
        <p>화면의 크기가 너무 큽니다. <br>창 크기를 줄이시거나 모바일로 확인하여 주세요</p>
    </div>
</template>

<script>
export default {
    name: 'LargeScreen'
}
</script>

<style scoped>
h1 {
    color: rgb(235, 0, 0);
}

.width-container {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
}

p {
    margin: 10px 0;
    font-size: var(--font-b-size);
    word-break: keep-all;
}

button {
    width: 60%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-n-size);
    color: #fff;
    background-color: var(--main-color);
}
</style>