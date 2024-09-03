<template>
    <div class="home-container margin-bottom">
        <header class="home-header">
            <div class="home-logo">
                <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
            </div>
            <RouterLink to="/notification/pushList">
                <div class="new-push-box">
                    <img src="@/assets/img/icon_alarm.png" alt="Notification" class="notification-icon">
                    <div v-if="newPush === false" class="new-icon-box">
                        <div class="new-icon">N</div>
                    </div>
                </div>
            </RouterLink>
        </header>
        <div class="welcome-section">
            <h1 class="home-text-user">{{ user.name }}님</h1>
            <p class="home-text">오늘 하루도 건강을 잘 챙기시고 계시나요?</p>
            <small>오늘도 G-con과 함께 건강상태를 체크해 보아요</small>
            <div class="grid-container">
                <div class="grid-item item1">
                    <RouterLink to="/signup/qr">  
                        <div class="health-data-text">
                            <p>MY 건강 데이터<br /> 측정하기</p>
                            <small>(QR 코드 생성)</small>
                        </div>
                        <img src="@/assets/img/Online Doctor-rafiki.png" alt="Health Data Measurement">
                    </RouterLink>
                </div>
                <RouterLink :to="`/user/reportList/${user.userSid}`" class="move">
                    <div class="grid-item item2 report-chk">
                        <p>측정기록 확인하기</p>
                        <img src="@/assets/img/Medical prescription-bro.png" alt="Check Records">
                    </div>
                </RouterLink>
                <RouterLink to="/findContainer" class="move">
                    <div class="grid-item item3 find-con">
                        <p>G-CON<br />찾기</p>
                        <img src="@/assets/img/Thinking face-bro.png" alt="Find G-Con">
                    </div>
                </RouterLink>
            </div>
        </div>
        <!-- <div class="action-buttons">
            <RouterLink to="/signup/qr">
                <button class="qr-button">MY 건강 Data<br>측정하기<br>(QR 코드 생성)</button>
            </RouterLink>
            <RouterLink :to="`/user/reportList/${user.userSid}`">
                <button class="chk-button">측정기록<br>확인하기</button>
            </RouterLink>
        </div> -->
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
                if(this.user.gender === "") {
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
    padding: 20px 30px;
}

header .logo {
    width: 80px;
    margin-bottom: 0;
}

.home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}

.notification-icon {
    width: 30px;
    height: 30px;
}

.welcome-section .home-text-user {
    color: var(--main-color);
    margin-bottom: 10px;
    font-size: var(--font-b-size);
}

.welcome-section .home-text {
    font-size: var(--font-n-size);
}

.welcome-section small {
    color: var(--light-font-color);
    font-weight: var(--font-t-weight);
}

.grid-container {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    gap: 10px;
    margin: 50px 0;
    /* width: 600px;
    height: 400px; */
}

.grid-item {
    background-color: white;
    border-radius: 10px;
    padding: 20px 0 0 20px;
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
}

.health-data-text {
    width: 100%;
}

.item1 {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
}

.item2 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
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
    /* align-items: start; */
}

.grid-container .grid-item p {
    word-break: keep-all;
    font-size: var(--input-font-size);
    font-weight: var(--font-b-weight);
}

.grid-container .report-chk img,
.grid-container .find-con img {
    width: 80px;
}

/* .action-buttons {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 20px;
    margin-bottom: 20px;
} */

.qr-button {
    background: url("@/assets/img/main_img_01_bg.png") no-repeat center/cover;
}

.chk-button {
    background: url("@/assets/img/main_img_02.png") no-repeat center/cover;
}

/* .action-buttons a {
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
    height: 150px;
    font-size: var(--font-n-size);
    border-radius: 10px;
    color: #fff;
    font-weight: var(--font-b-weight);
    border: none;
} */

.new-push-box {
    position: relative;
}

.new-icon-box {
    background: red;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    position: absolute;
    top: 0;
    right: 0;
}
</style>