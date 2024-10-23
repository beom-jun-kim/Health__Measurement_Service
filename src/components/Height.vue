<template>
    <GoBack :goBackText="goBackText" />
    <div class="page-title">
        <h2>키와 몸무게를 알려주세요</h2>
        <p>회원님의 키와 몸무게를 정확하게 입력해주세요</p>
    </div>
    <div class="height-picker">
        <p>키</p>
        <div class="height-picker-box">
            <div class="picker-wrapper">
                <select v-model="selectedHeight">
                    <option v-for="height in heights" :key="height" :value="height">
                        {{ height }}
                    </option>
                </select>
            </div>
            <div class="unit">cm</div>
        </div>
    </div>

    <div class="height-picker">
        <p>몸무게</p>
        <div class="height-picker-box">
            <div class="picker-wrapper">
                <select v-model="selectedweight">
                    <option v-for="weight in weights" :key="weight" :value="weight">
                        {{ weight }}
                    </option>
                </select>
            </div>
            <div class="unit">kg</div>
        </div>
    </div>
    <button class="submit-button" @click="bodyInfoSave">완료</button>
</template>

<script>
import UserDataService from "@/api/U1serDataService";
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'Height',
    components: {
        GoBack,
    },
    data() {
        return {
            selectedHeight: null,
            selectedweight: null,
            heights: Array.from({ length: 150 }, (v, k) => k + 100),
            weights: Array.from({ length: 150 }, (v, k) => k + 1),
            goBackText: "QR 생성",
        };
    },
    methods: {
        async bodyInfoSave() {
            if (this.selectedHeight === null) {
                alert("키를 입력하여 주세요");
            } else if (this.selectedweight === null) {
                alert("몸무게를 입력하여 주세요");
            } else {
                try {
                    const data = {
                        height: this.selectedHeight,
                        weight: this.selectedweight,
                    }
                    await UserDataService.editUserInfo(data);
                    this.$emit('save-body-info', { data });
                    alert("키와 몸무게는 '내정보 > 내정보 변경하기'에서 수정할 수 있습니다");
                } catch (error) {
                    console.log("키, 몸무게 저장실패", error);
                }
            }
        }
    }
};
</script>

<style scoped>
.container a {
    width: 100%;
    text-align: center;
}

.page-title {
    margin-bottom: 20px;
    width: 100%;
}

.page-title h2 {
    margin: 0;
    font-size: var(--font-b-size);
    font-weight: bold;
}

.page-title p {
    margin: 10px 0 0;
    font-size: var(--font-n-sec-size);
    word-break: keep-all;
}

.height-picker {
    width: 100%;
    margin-top: 50px;
}

.height-picker-box {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.unit {
    font-size: var(--font-n-sec-size);
    margin-right: 10px;
}

.picker-wrapper {
    position: relative;
    width: 60%;
    margin-right: 10px;
}

.picker-wrapper p {
    margin-bottom: 10px;
    font-weight: var(--font-b-weight);
}

.picker-wrapper select {
    width: 100%;
    font-size: var(--font-n-sec-size);
    padding: 10px;
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    appearance: none;
    outline: none;

}

.submit-button {
    width: 100%;
    padding: 15px;
    margin-top: 40px;
    text-align: center;
    font-weight: var(--font-b-weight);
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);
}

.submit-button:disabled {
    background-color: var(--input-border-color);
}

.logo {
    margin-bottom: 35px;
}
</style>