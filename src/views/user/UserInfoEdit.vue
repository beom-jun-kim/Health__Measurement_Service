<template>
    <div class="myInfo-container margin-bottom">
        <GoBack :goBackText="goBackText" />
        <div class="profile-section">
            <!-- <label for="profile-img">
                <div class="img-upload">
                    <div v-if="!imgPathUrl" class="null-img">
                        <span>+</span>
                    </div>
                    <div v-else class="v-img" :style="{ 'background-image': 'url(' + imgPathUrl + ')' }"></div>
                </div>
            </label>
            <input id="profile-img" type="file" class="profile-input" name="profile-img" accept="image/*"> -->
            <div class="user-box">
                <div v-if="user.gender === 'F'" class="profile-img">
                    <img src="@/assets/img/charac_w.png" alt="프로필 이미지">
                </div>
                <div v-if="user.gender === 'M'" class="profile-img">
                    <img src="@/assets/img/charac_m.png" alt="프로필 이미지">
                </div>
                <div class="user-text-info">
                    <input type="text" class="value" name="username" v-model="user.name" required>
                </div>
            </div>
        </div>
        <div class="info-section">
            <form class="edit-form" @submit.prevent="editSave">
                <div class="info-item">
                    <span class="label">연락처</span>
                    <!-- <input type="text" class="value" name="phoneNum" v-model="user.phoneNumber"> -->
                    <span>{{ user.phoneNumber }}</span>
                </div>
                <div class="info-item">
                    <span class="label">성별</span>
                    <!-- <span>{{ user.gender === 'M' ? '남자' : '여자' }}</span> -->
                    <div class="gender-chk">
                        <input type="radio" id="men" class="value" name="gender" value="M" v-model="user.gender">
                        <label for="men">남</label>

                        <input type="radio" id="woman" class="value" name="gender" value="F" v-model="user.gender">
                        <label for="woman">여</label>
                    </div>
                </div>
                <div class="info-item">
                    <span class="label">생년월일</span>
                    <span>{{ user.birthday }}</span>
                    <!-- <input type="text" class="value" name="birth" v-model="user.birthday"> -->
                </div>
                <div class="info-item">
                    <span class="label">키</span>
                    <div class="info-item-box">
                        <input type="text" class="value" name="height" v-model="user.height" required>
                        <span class="height">cm</span>
                    </div>
                </div>
                <div class="info-item"
                    style="border-bottom: 1px solid var(--input-border-color); padding-bottom: 20px;">
                    <span class="label">체중</span>
                    <div class="info-item-box">
                        <input type="text" class="value" name="weight" v-model="user.weight" required>
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
            user: {},
            goBackText: "내 정보 변경하기",
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async editSave() {
            const height = Number(this.user.height);
            const weight = Number(this.user.weight);

            if (isNaN(height) || isNaN(weight)) {
                alert("키와 체중은 숫자를 입력하여 주세요");
            } else {
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
    padding: 20px 30px;
}

.profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid var(--input-border-color);
    overflow: hidden;
    margin-bottom: 10px;
    margin: 0 auto 10px;
}

.profile-img img {
    height: 100%;
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
    font-size: var(--input-font-size);
}

.info-section h3 {
    margin-bottom: 10px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    margin-bottom: 20px;
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
    border-radius: var(--border-radius);
}

input[class="value"] {
    padding: 7px 10px;
    text-align: right;
    font-size: var(--input-font-size);
}

input[name="username"] {
    margin: 0 0 15px;
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
    font-size: var(--input-font-size);
    border-radius: 5px;
}

.gender-chk label {
    margin-left: 10px;
}

.gender-chk input[id="woman"] {
    margin-left: 80px;
}
</style>