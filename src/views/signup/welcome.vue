<template>
    <transition>
        <div class="container" v-if="visible">
            <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
            <img src="@/assets/img/app_a0004_tt.png" alt="welcome join" class="welcome-text">
            <p>
                <span>회원가입</span>이 완료 되었습니다.<br>
                G-CON과 함께 건강과 행복을 챙겨가세요.
            </p>
            <img src="@/assets/img/app_img_people.png" alt="welcome join">
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.visible = false;
            setTimeout(() => {
                this.$router.push('/home');
            }, 800);
        }, 1200);
    }
};
</script>

<style scoped>
.container {
    text-align: center;
}

.container .welcome-text {
    margin-top: 30px;
}

.container p {
    margin: 20px 0 30px;
    font-size: var(--font-n-sec-size);
}

.container span {
    font-weight: var(--font-b-weight);
}

.v-enter-active, .v-leave-active {
    transition: opacity .8s;
}
.v-enter-from, .v-leave-to{
    opacity: 0;
}
</style>
