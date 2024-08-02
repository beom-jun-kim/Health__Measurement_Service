<template>
    <div class="container">
        <div class="qr-container" v-if="user.height && user.weight">
            <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
            <div class="qr-hand-img" v-if="qrCreateBtn">
                <img src="@/assets/img/madeqr.png" alt="QR">
            </div>
            <button v-if="qrCreateBtn" class="qr-btn" @click="displayNone">인증용 QR생성하기</button>
            <div class="img_box" v-if="qr">
                <QRCodeVue3 :value="qr.qrCode" />
            </div>
        </div>
        <Height v-if="user.height === null || user.weight === null" @save-body-info="updateBodyInfo" />
    </div>
</template>

<script>
import Height from "@/components/Height.vue";
import UserDataService from "@/api/UserDataService";
import Qr from "@/api/Qr";
import QRCodeVue3 from "qrcode-vue3";

export default {
    name: 'qr',
    components: {
        Height,
        QRCodeVue3
    },
    data() {
        return {
            qrCreateBtn: true,
            qr: "",
            user: {}
        }
    },
    methods: {
        async displayNone() {
            this.qrCreateBtn = false;
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
    },
    async mounted() {
        await this.getUserInfo();
    }
}
</script>

<style scoped>
.qr-hand-img {
    width: 300px;
    margin: 30px 0 20px;
}

.qr-container {
    text-align: center;
    /* margin-bottom: 100px; */
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

.img_box {
    margin-top: 50px;
}
</style>