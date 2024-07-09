<template>
    <div class="container">
        <img src="../../../public/img/app_logo_01.png" alt="G-CON Logo" class="logo">
        <div class="qr-hand-img">
            <img src="../../../public/img/madeqr.png" alt="QR">
        </div>
        <button type="submit" class="qr-btn">인증용 QR생성하기</button>
    </div>
</template>

<script>
export default {
    name: 'userLogin',
};
</script>

<style scoped>
.qr-hand-img {
    width: 200px;
    margin: 30px 0 20px;
}

.qr-hand-img img {
    max-width: 100%;
}

.qr-btn {
    width: 80%;
    padding: 20px 0;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-b-size);
    color: #fff;
    background-color: var(--main-color);
    cursor: pointer;
    font-weight: var(--font-b-weight);
}
</style>