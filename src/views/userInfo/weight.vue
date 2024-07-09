<template>
    <div class="container">
        <img src="../../../public/img/app_logo_01.png" alt="G-CON Logo" class="logo">
        <div class="page-title">
            <h2>몸무게를 알려주세요</h2>
            <p>회원님의 몸무게를 정확하게 입력해주세요</p>
        </div>
        <div class="weight-picker">
            <div class="picker-wrapper">
                <select v-model="selectedweight">
                    <option v-for="weight in weights" :key="weight" :value="weight">
                        {{ weight }}
                    </option>
                </select>
            </div>
            <div class="unit">kg</div>
        </div>
        <RouterLink to="/signup/welcome">
            <button class="submit-button">완료</button>
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'weight',
    data() {
        return {
            selectedweight: null,
            weights: Array.from({ length: 150 }, (v, k) => k + 1)
        };
    },
};
</script>

<style scoped>
.logo {
    width: 150px;
    margin-bottom: 20px;
}

.container a {
    width: 100%;
    text-align: center;
}

.page-title {
    text-align: center;
    margin-bottom: 20px;
}

.page-title h2 {
    margin: 0;
    font-size: var(--font-b-size);
    font-weight: bold;
}

.page-title p {
    margin: 10px 0 0;
    font-size: var(--font-n-sec-size);
    color: #666;
    word-break: keep-all;
}

.weight-picker {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.unit {
    font-size: var(--font-b-size);
    margin-right: 10px;
}

.picker-wrapper {
    position: relative;
    width: 100px;
    margin-right: 10px;
}

.picker-wrapper select {
    width: 100%;
    font-size: var(--font-b-size);
    text-align: center;
    padding: 5px 0;
    border: 1px solid var(--input-border-color);
    border-radius: 5px;
    appearance: none;
    outline: none;
}

.submit-button {
    width: 100%;
    max-width: 300px;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-n-size);
    color: #fff;
    background-color: var(--main-color);
    text-align: center;
    font-weight: var(--font-b-weight);
}

.submit-button:disabled {
    background-color: var(--input-border-color);
}
</style>