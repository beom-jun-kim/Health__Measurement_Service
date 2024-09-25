<template>
    <div class="container">
        <!-- <div v-if="qrCreateBtn === false" class="background-img"></div> -->
        <!-- <div :class="{ 'overlay': qrCreateBtn === false }"> -->
        <div class="go-back-btn" v-if="qrCreateBtn === false">
            <div class="arrow" @click="goBack">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24"
                        fill="none">
                        <path d="M15 7L10 12L15 17" stroke="#111" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></span>
            </div>
            <div class="logo-img-box">
                <span>QR 생성</span>
            </div>
            <div style="width: 40px;"></div>
        </div>
        <div class="qr-container" v-if="user.height && user.weight">
            <GoBack v-if="qrCreateBtn" :goBackText="goBackText" />
            <div v-if="qrCreateBtn">
                <div class="qr-hand-img">
                    <img src="@/assets/img/QR Code-bro.png" alt="QR">
                </div>
                <p>인증용 QR를 생성해 보세요</p>
                <small>나의 건강상태를 체크해 건강과 행복을 찾아가세요.</small>
                <button class="qr-btn" @click="displayNone">QR생성하기</button>
            </div>
            <div class="img_box" v-if="qr">
                <qrcode-vue :value="qr.qrCode" :size="180" />
                <p>QR 코드를 생성하였습니다</p>
                <small>나의 건강상태를체크해 건강과 행복을 찾아가세요.</small>
            </div>
        </div>
        <!-- </div> -->
        <Height v-if="user.height === null || user.weight === null" @save-body-info="updateBodyInfo" />
    </div>
</template>

<script>
import Height from "@/components/Height.vue";
import UserDataService from "@/api/UserDataService";
import Qr from "@/api/Qr";
import QrcodeVue from 'qrcode.vue';
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'qr',
    components: {
        Height,
        QrcodeVue,
        GoBack,
    },
    data() {
        return {
            qrCreateBtn: true,
            qr: "",
            user: {},
            goBackText: "QR 생성",
            // goBackBtn: false,
            // bigLogoImg: true,
        }
    },
    methods: {
        async displayNone() {
            this.qrCreateBtn = false;
            // this.goBackBtn = true;
            // this.bigLogoImg = false;
            try {
                const response = await Qr.qrCreate()
                this.qr = response.data;
                this.qrTimeOut();
            } catch (error) {
                console.log("qr생성실패", error);
            }
        },
        updateBodyInfo(bodyInfo) {
            this.user.height = bodyInfo.height;
            this.user.weight = bodyInfo.weight;
            this.getUserInfo();
        },
        async getUserInfo() {
            try {
                const response = await UserDataService.getUserInfo();
                this.user = response.data;
            } catch (error) {
                console.log("내 유저정보 조회실패", error);
            }
        },
        goBack() {
            this.qrCreateBtn = true;
            this.qr = "";
        },
        qrTimeOut() {
            if (this.qr) {
                setTimeout(() => {
                    this.qrCreateBtn = true;
                    this.qr = "";
                }, 300000)
            }
        }
    },
    async mounted() {
        await this.getUserInfo();
    }
}
</script>

<style scoped>
.container {
    margin-bottom: 0;
}

/* .background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("@/assets/img/walk-img.jpeg") no-repeat center/cover;
    filter: blur(2px);
} */

/* .overlay {
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
} */

.go-back-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 20px 30px 50px; */
}

.logo-img-box {
    text-align: center;
}

.arrow {
    font-size: var(--font-b-size);
}

.qr-hand-img {
    padding: 0 40px 40px;
}

.qr-container {
    text-align: center;
    /* position: relative; */
}

.qr-container p {
    font-weight: var(--font-b-weight);
    font-size: var(--font-n-size);
}

.qr-container small {
    font-weight: var(--font-t-weight);
}

.logo {
    margin-bottom: 0;
}

.qr-btn {
    width: 100%;
    padding: 15px;
    border: none;
    margin-top: 30px;
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);
}

.img_box {
    width: 100%;
    letter-spacing: .5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.img_box p {
    font-size: var(--font-n-size);
    margin: 30px 0 5px;
    word-break: keep-all;
}

.img_box small {
    word-break: keep-all;
}
</style>