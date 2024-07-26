<template>
    <header class="logo-header">
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
</template>

<script>
export default {
    name: "GoBack",
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
}
</script>

<style>
.logo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 30px;
}

.logo-img-box {
    width: 100px;
}

.arrow {
    font-size: var(--font-b-size);
}
</style>