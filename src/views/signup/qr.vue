<template>
    <header class="logo-header" v-if="goBackBtn">
        <div class="arrow" @click="goBack">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg></span>
        </div>
        <div class="logo-img-box">
            <img src="@/assets/img/app_logo_02.png" alt="logo header">
        </div>
        <div style="width: 40px;"></div>
    </header>
    <div class="container">
        <div class="qr-container" v-if="user.height && user.weight">
            <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo" v-if="bigLogoImg">
            <div class="qr-hand-img" v-if="qrCreateBtn">
                <img src="@/assets/img/madeqr.png" alt="QR">
            </div>
            <button v-if="qrCreateBtn" class="qr-btn" @click="displayNone">인증용 QR생성하기</button>
            <div class="img_box" v-if="qr">
                <p>생성된 QR을 키오스크에 대어 주세요 </p>
                <qrcode-vue :value="qr.qrCode" :size="200" />
            </div>
        </div>
        <Height v-if="user.height === null || user.weight === null" @save-body-info="updateBodyInfo" />
    </div>
</template>

<script>
import Height from "@/components/Height.vue";
import UserDataService from "@/api/UserDataService";
import Qr from "@/api/Qr";
import QrcodeVue from 'qrcode.vue';

export default {
    name: 'qr',
    components: {
        Height,
        QrcodeVue
    },
    data() {
        return {
            qrCreateBtn: true,
            qr: "",
            user: {},
            goBackBtn: false,
            bigLogoImg: true,
        }
    },
    methods: {
        async displayNone() {
            this.qrCreateBtn = false;
            this.goBackBtn = true;
            this.bigLogoImg = false;
            try {
                const response = await Qr.qrCreate()
                this.qr = response.data;
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
            this.bigLogoImg = true;
            this.goBackBtn = false;
        }
    },
    async mounted() {
        await this.getUserInfo();
    }
}
</script>

<style scoped>
.logo-header {
    padding: 20px 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.logo-img-box {
    width: 100px;
}

.arrow {
    font-size: var(--font-b-size);
}

.qr-hand-img {
    width: 300px;
    margin: 30px 0 20px;
}

.qr-container {
    text-align: center;
}

.logo {
    margin-bottom: 0;
}

.qr-btn {
    width: 100%;
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

.qr-hand-img {
    width: 250px;
}

.img_box p {
    margin-bottom: 20px;
    font-size: var(--font-n-size);
}
</style>