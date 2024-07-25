<template>
    <div class="container">
        <div class="qr-container" v-if="user.height && user.weight">
            <img src="../../../public/img/app_logo_01.png" alt="G-CON Logo" class="logo">
            <div class="qr-hand-img" v-if="qrCreateBtn">
                <img src="../../../public/img/madeqr.png" alt="QR">
            </div>
            <button v-if="qrCreateBtn" class="qr-btn" @click="displayNone">인증용 QR생성하기</button>
            <div class="img_box">
                <img v-if="qr" src="../../assets/img/1oaZE.jpg" alt="">
            </div>
        </div>
        <Height v-if="user.height === '' && user.weight === ''" @save-body-info="updateBodyInfo" />
    </div>
</template>

<script>
import Height from "@/components/Height.vue";

export default {
    name: 'qr',
    components: {
        Height,
    },
    data() {
        return {
            qrCreateBtn: true,
            qr: false,
            user: {
                username: "홍길동",
                phoneNum: "010-1234-4567",
                gender: "남",
                birth: "1960년 01월 01일",
                height: "",
                weight: "",
            }
        }
    },
    methods: {
        displayNone() {
            this.qrCreateBtn = false;
            this.qr = true;
        },
        updateBodyInfo(bodyInfo) {
            this.user.height = bodyInfo.height;
            this.user.weight = bodyInfo.weight;
        }
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

.qr-hand-img img {
    max-width: 100%;
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
</style>