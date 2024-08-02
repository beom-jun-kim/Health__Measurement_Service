<template>
    <img src="@/assets/img/app_logo_02.png" alt="G-CON Logo" class="logo">
    <div class="page-title">
        <h2>키를 알려주세요</h2>
        <p>회원님의 신장을 정확하게 입력해주세요</p>
    </div>
    <div class="height-picker">
        <div class="picker-wrapper">
            <select v-model="selectedHeight">
                <option v-for="height in heights" :key="height" :value="height">
                    {{ height }}
                </option>
            </select>
        </div>
        <div class="unit">cm</div>
    </div>

    <div class="page-title" style="margin-top: 50px;">
        <h2>몸무게를 알려주세요</h2>
        <p>회원님의 몸무게를 정확하게 입력해주세요</p>
    </div>
    <div class="height-picker">
        <div class="picker-wrapper">
            <select v-model="selectedweight">
                <option v-for="weight in weights" :key="weight" :value="weight">
                    {{ weight }}
                </option>
            </select>
        </div>
        <div class="unit">kg</div>
    </div>
    <button class="submit-button" @click="bodyInfoSave">완료</button>
</template>

<script>
import UserDataService from "@/api/UserDataService";

export default {
    name: 'Height',
    data() {
        return {
            selectedHeight: null,
            selectedweight: null,
            heights: Array.from({ length: 150 }, (v, k) => k + 100),
            weights: Array.from({ length: 150 }, (v, k) => k + 1)
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
    /* text-align: center; */
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

.height-picker {
    display: flex;
    justify-content: center;
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