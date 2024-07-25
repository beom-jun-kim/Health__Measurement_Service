<template>
    <div class="myInfo-container margin-bottom">
        <header class="header">
            <button class="back-button" @click="goBack">←</button>
        </header>
        <div class="profile-section">
            <label for="profile-img">
                <div class="img-upload">
                    <div v-if="!imgPathUrl" class="null-img">
                        <span>+</span>
                    </div>
                    <div v-else class="v-img" :style="{ 'background-image': 'url(' + imgPathUrl + ')' }"></div>
                </div>
            </label>
            <input id="profile-img" type="file" class="profile-input" name="profile-img" accept="image/*">
            <input type="text" class="value" name="username" v-model="user.username">
            <p>G-CON 사용자</p>
            <div class="buttons">
                <h1 class="info-button">내정보 변경하기</h1>
            </div>
        </div>
        <div class="info-section">
            <form class="edit-form" @submit.prevent="editSave">
                <h3>내 정보</h3>
                <div class="info-item">
                    <span class="label">연락처</span>
                    <input type="text" class="value" name="phoneNum" v-model="user.phoneNum">
                </div>
                <div class="info-item">
                    <span class="label">성별</span>
                    <input type="text" class="value" name="gender" v-model="user.gender">
                </div>
                <div class="info-item">
                    <span class="label">생년월일</span>
                    <input type="text" class="value" name="birth" v-model="user.birth">
                </div>
                <div class="info-item">
                    <span class="label">키</span>
                    <input type="text" class="value" name="height" v-model="user.height">
                </div>
                <div class="info-item">
                    <span class="label">체중</span>
                    <input type="text" class="value" name="weight" v-model="user.weight">
                </div>
                <button type="submit" class="edit-save">저장</button>
            </form>
        </div>
        <!-- <RouterLink to="/user/secession" class="secession">
            <div class="actions-section">
                <div class="action-item">회원탈퇴</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                        fill="#ccc" />
                </svg>
            </div>
        </RouterLink> -->
    </div>
</template>

<script>
export default {
    name: 'userInfoEdit',
    data() {
        return {
            user: {
                username: "홍길동",
                phoneNum: "010-1234-4567",
                gender: "남",
                birth: "1960년 01월 01일",
                height: "165cm",
                weight: "65kg",
            }
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        editSave() {
            this.$router.push("/user/myInfo");
        }
    }
};
</script>

<style scoped>
.edit-form {
    position: relative;
}

.myInfo-container {
    padding: 20px;
}

.header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}

.back-button {
    font-size: 30px;
    border: none;
    background: none;
    cursor: pointer;
}

.profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
}

.profile-input {
    display: none;
}

.img-upload {
    border-radius: 50%;
    height: 90px;
    width: 90px;
    border: 1px dashed var(--input-border-color);
    line-height: 90px;
    text-align: center;
}

.img-upload .null-img span {
    color: var(--input-border-color);
    font-size: var(--font-b-size);
}

.profile-section h2 {
    margin: 10px 0 5px;
}

.profile-section p {
    margin: 0;
    color: #666;
}

.buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.secession {
    display: inline-block;
    width: 100%;
}

.info-button,
.logout-button {
    font-size: var(--font-n-sec-size);
}

.info-section {
    margin-bottom: 20px;
}

.info-section h3 {
    margin-bottom: 10px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--input-border-color);
}

.info-section .label {
    color: var(--main-color);
}

.actions-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.action-item {
    cursor: pointer;
}

input {
    border: 1px solid var(--input-border-color);
}

input[class="value"] {
    padding: 10px 5px;
}

input[name="username"] {
    margin: 15px 0;
    text-align: center;
}

.edit-save {
    background: var(--main-color);
    color: #fff;
    border: none;
    padding: 8px 20px;
    position: absolute;
    right: 0;
    margin-top: 10px;
    font-weight: var(--font-b-weight);
    font-size: var(--font-n-sec-size);
}
</style>