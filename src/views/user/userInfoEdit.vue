<template>
    <div class="myInfo-container margin-bottom">
        <GoBack />
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
            <input type="text" class="value" name="username" v-model="user.name">
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
                    <input type="text" class="value" name="phoneNum" v-model="user.phoneNumber">
                </div>
                <div class="info-item">
                    <span class="label">성별</span>
                    <div class="gender-chk">
                        <input type="radio" id="men" class="value" name="gender" value="M"v-model="user.gender">
                        <label for="men">남</label>
    
                        <input type="radio" id="woman" class="value" name="gender" value="F" v-model="user.gender">
                        <label for="woman">여</label>
                    </div>
                </div>
                <div class="info-item">
                    <span class="label">생년월일</span>
                    <input type="text" class="value" name="birth" v-model="user.birthday">
                </div>
                <div class="info-item">
                    <span class="label">키</span>
                    <div class="info-item-box">
                        <input type="text" class="value" name="height" v-model="user.height">
                        <span class="height">cm</span>
                    </div>
                </div>
                <div class="info-item">
                    <span class="label">체중</span>
                    <div class="info-item-box">
                        <input type="text" class="value" name="weight" v-model="user.weight">
                        <span class="weight">kg</span>
                    </div>
                </div>
                <button type="submit" class="edit-save">저장</button>
            </form>
        </div>
    </div>
</template>

<script>
import UserDataService from "@/api/UserDataService";
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'userInfoEdit',
    components: {
        GoBack,
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async editSave() {
            if (confirm("수정하시겠습니까?")) {
                try {
                    const data = {
                        name: this.user.name,
                        gender: this.user.gender,
                        birthday: this.user.birthday,
                        phoneNumber: this.user.phoneNumber,
                        height: this.user.height,
                        weight: this.user.weight,
                    }
                    await UserDataService.editUserInfo(data);
                    alert("수정되었습니다");
                    this.$router.push("/user/myInfo");
                } catch (error) {
                    console.log("수정실패", error);
                }
            }
        },
        async getUserInfo() {
            try {
                const response = await UserDataService.getUserInfo()
                this.user = response.data;
            } catch (error) {
                console.log("조회실패", error);
            }
        }
    },
    async mounted() {
        await this.getUserInfo();
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

.info-item-box .height {
    margin-left: 10px;
}

.info-item-box .weight {
    margin-left: 15px;
}

.info-item-box input {
    width: 127px;

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

.gender-chk label {
    margin-left: 10px;
}

.gender-chk input[id="woman"] {
    margin-left: 80px;
}
</style>