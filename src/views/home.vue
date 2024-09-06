<template>
    <div class="home-container">
        <header class="home-header">
            <div></div>
            <RouterLink to="/notification/pushList">
                <div class="new-push-box">
                    <img src="@/assets/img/alarm_white.png" alt="Notification" class="notification-icon">
                    <div v-if="newPush === false" class="new-icon-box">
                        <div class="new-icon">N</div>
                    </div>
                </div>
            </RouterLink>
        </header>
        <section class="main-greeting-wrap">
            <div class="main-greeting-box">
                <div class="main-greeting-img">
                    <img src="@/assets/img/img_main_woman.png" alt="메인 사람 이미지">
                </div>
                <div class="main-greeting-text">
                    <div class="main-greeting-gcon">
                        <img src="@/assets/img/app_logo_02_white.png" alt="지콘 아이콘">
                    </div>
                    <div class="main-greeting-desc">
                        <div class="main-greeting-desc-name">
                            <h1>{{ user.name }}님</h1>
                        </div>
                        <div class="main-greeting-desc-hello">
                            <p>반갑습니다</p>
                        </div>
                        <div class="main-greeting-desc-long">
                            <p>
                                오늘 하루도<br>
                                건강을 잘 챙기고<br>
                                계시나요?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="welcome-section">
            <div class="grid-container">
                <RouterLink to="/signup/qr" class="item1">
                    <div class="grid-item">
                        <div class="health-data-text">
                            <p>MY 건강 데이터 측정하기</p>
                            <small>(QR 코드 생성)</small>
                        </div>
                        <img src="@/assets/img/Online Doctor-rafiki.png" alt="Health Data Measurement">
                    </div>
                </RouterLink>
                <RouterLink :to="`/user/reportList/${user.userSid}`" class="move item2">
                    <div class="grid-item report-chk">
                        <p>측정기록 확인하기</p>
                        <img src="@/assets/img/Medical prescription-bro.png" alt="Check Records">
                    </div>
                </RouterLink>
                <RouterLink to="/findContainer" class="move item3">
                    <div class="grid-item find-con">
                        <p>G-CON<br />찾기</p>
                        <img src="@/assets/img/Thinking face-bro.png" alt="Find G-Con">
                    </div>
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script>
import UserDataService from '@/api/UserDataService';
import Push from "@/api/Push";

export default {
    name: 'home',
    data() {
        return {
            user: {},
            newPush: false,
        }
    },
    methods: {
        async getMyInfo() {
            try {
                const response = await UserDataService.getUserInfo();
                this.user = response.data;
                if (this.user.gender === "") {
                    this.$router.push("/signup/gender");
                }
            } catch (error) {
                console.log("유저조회 실패", error);
            }
        },
        async getReadNewPush() {
            try {
                const response = await Push.newIconPush()
                this.newPush = response.data.readCk;
            } catch (error) {
                console.log("새로운 알림 조회 실패", error);
            }
        },
    },
    async mounted() {
        await this.getMyInfo();
        await this.getReadNewPush();
    }
};
</script>

<style scoped>
.move {
    display: contents;
}

.home-container {
    background: var(--main-color);
    padding: 20px 0 0;
}

.home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 10px; */
    padding: 0 30px;
}

.notification-icon {
    height: 25px;
}

.main-greeting-text {
    padding-top: 30px;
}

.main-greeting-wrap {
    margin-bottom: -50px;
    padding: 0 20px;
}

.main-greeting-box {
    display: flex;
    width: 100%;
    justify-content: space-around;
    gap: 20px;
}

.main-greeting-desc-name {
    color: #fff;
    font-size: 20px;
    margin-bottom: 20px;
}

.main-greeting-gcon {
    width: 100px;
    margin-bottom: 40px;
}

.main-greeting-desc-hello {
    color: var(--main-color);
    background: #fff;
    text-align: center;
    border-radius: 50px;
    padding: 3px;
    font-size: var(--font-n-size);
    font-weight: var(--font-b-weight);
    margin-bottom: 20px;
}

.main-greeting-desc-long {
    color: #fff;
    font-size: var(--font-n-size);
}

.main-greeting-desc-long p {
    word-break: keep-all;
}

.welcome-section {
    background: #fff;
    border-radius: 10% 10% 0 0;
    padding: 10px 30px 80px;
}

.grid-container {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    gap: 10px;
    margin: 50px 0 0;
}

.grid-item {
    border-radius: var(--border-radius);
    padding: 0 20px;
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
}

.grid-item img {
    width: 140px;
}

.item1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}

.item2 {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

.item3 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
}

.report-chk,
.find-con {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.grid-container .grid-item p {
    word-break: keep-all;
    font-size: var(--font-n-sec-size);
    font-weight: var(--font-b-weight);
}

.grid-container .report-chk img {
    width: 70px;
}

.grid-container .find-con img {
    width: 80px;
}

.qr-button {
    background: url("@/assets/img/main_img_01_bg.png") no-repeat center/cover;
}

.chk-button {
    background: url("@/assets/img/main_img_02.png") no-repeat center/cover;
}

.new-push-box {
    position: relative;
}

.new-icon-box {
    background: red;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    font-size: 8px;
    width: 12px;
    height: 12px;
    line-height: 12px;
    position: absolute;
    top: 0;
    right: 0;
}
</style>