<template>
    <div class="home-container">
        <header class="home-header">
            <img src="../../public/img/icon_alarm.png" alt="Notification" class="notification-icon">
        </header>
        <div class="welcome-section">
            <img src="../../public/img/img_main.png" alt="Health Illustration" class="illustration">
            <h1 class="home-text-user">홍길동님</h1>
            <p class="home-text">오늘 하루도 건강을 잘 챙기시고 계시나요?</p>
        </div>
        <div class="action-buttons">
            <button class="action-button">MY 건강 Data<br>측정하기<br>(QR 코드 생성)</button>
            <button class="action-button">측정기록<br>확인하기</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
};
</script>

<style scoped>

.home-container {
    padding: 20px;
    height: 100vh;
}

.home-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
}

.notification-icon {
    width: 24px;
    height: 24px;
}

.welcome-section {
    margin-bottom: 20px;
}

.welcome-section img {
    max-width: 100%;
}

.home-text-user {
    font-size: var(--font-b-size);
    margin: 15px 0 10px;
    font-weight: var(--font-b-weight);
}

.home-text {
    font-size: var(--font-b-size);
    color: #666;
}

.action-buttons {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-bottom: 20px;
}

.action-button {
    line-height: 25px;
    flex: 1;
    padding: 25px 15px;
    font-size: var(--font-n-size);
    text-align: center;
    border: 2px solid var(--input-border-color);
    background-color: #fff;
    color: var(--main-color);
    font-weight: var(--font-b-weight);
}
</style>