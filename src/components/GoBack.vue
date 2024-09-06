<template>
    <header class="logo-header">
        <div class="arrow" @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                <path d="M15 7L10 12L15 17" stroke="#111" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>
        <div class="logo-img-box">
            {{ goBackText }}
        </div>
        <div style="width: 40px;"></div>
    </header>
</template>

<script>
export default {
    name: "GoBack",
    props: {
        goBackText: {
            type: String,
        }
    },
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
    font-weight: var(--font-b-weight);
}

.arrow svg {
    vertical-align: middle;
}
</style>