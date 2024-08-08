<template>
    <div class="home-container margin-bottom">
        <header class="home-header">
            <img src="@/assets/img/icon_alarm.png" alt="Notification" class="notification-icon">
        </header>
        <div class="welcome-section">
            <img src="@/assets/img/img_main.png" alt="Health Illustration" class="illustration">
            <h1 class="home-text-user">{{ user.name }}님</h1>
            <p class="home-text">오늘 하루도 건강을 잘 챙기시고 계시나요?</p>
        </div>
        <div class="action-buttons">
            <RouterLink to="/signup/qr">
                <button class="qr-button">MY 건강 Data<br>측정하기<br>(QR 코드 생성)</button>
            </RouterLink>
            <RouterLink to="/user/report">
                <button class="chk-button">측정기록<br>확인하기</button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import UserDataService from '@/api/UserDataService';

export default {
    name: 'home',
    data() {
        return {
            user: {}
        }
    },
    methods: {
        async getMyInfo() {
            try {
                const response = await UserDataService.getUserInfo();
                this.user = response.data;

            } catch (error) {
                console.log("유저조회 실패", error);
            }
        },
    },
    async mounted() {
        await this.getMyInfo();
    }
};
</script>

<style scoped>
.home-container {
    padding: 20px;
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

.qr-button {
    background: url("@/assets/img/main_img_01_bg.png") no-repeat center/cover;
}

.chk-button {
    background: url("@/assets/img/main_img_02.png") no-repeat center/cover;
}

.action-buttons a {
    width: 100%;
}

.action-buttons button {
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    padding-bottom: 15px;
    line-height: 25px;
    flex: 1;
    height: 200px;
    font-size: var(--font-n-size);
    border-radius: 10px;
    color: #fff;
    font-weight: var(--font-b-weight);
    border: none;
}
</style>