<template>
    <div class="myInfo-container margin-bottom">
        <GoBack />
        <div class="profile-section">
            <div class="profile-image"></div>
            <h2>{{ user.username }}</h2>
            <p>G-CON 사용자</p>
            <div class="buttons">
                <RouterLink to="/user/userInfoEdit">
                    <button class="info-button">내정보 변경하기</button>
                </RouterLink>
                <button class="logout-button" @click="logout">로그아웃</button>
            </div>
        </div>
        <div class="info-section">
            <h3>내 정보</h3>
            <div class="info-item">
                <span class="label">연락처</span>
                <span class="value">{{ user.phoneNum }}</span>
            </div>
            <div class="info-item">
                <span class="label">성별</span>
                <span class="value">{{ user.gender }}</span>
            </div>
            <div class="info-item">
                <span class="label">생년월일</span>
                <span class="value">{{ user.birth }}</span>
            </div>
            <div class="info-item">
                <span class="label">키</span>
                <span class="value">{{ user.height }}</span>
            </div>
            <div class="info-item">
                <span class="label">체중</span>
                <span class="value">{{ user.weight }}</span>
            </div>
        </div>
        <RouterLink to="/user/secession" class="secession">
            <div class="actions-section">
                <div class="action-item">회원탈퇴</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                        fill="#ccc" />
                </svg>
            </div>
        </RouterLink>
    </div>
</template>

<script>
import UserDataService from "@/api/UserDataService";
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'myInfo',
    components:{
        GoBack,
    },
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
        async logout() {
            try {
                const response = await UserDataService.logout();
                console.log("로그아웃 성공", response);
                this.$router.push("/login/userLogin");
            } catch (error) {
                console.log("로그아웃 실패", error);
            }

        }
    }
};
</script>

<style scoped>
.myInfo-container {
    padding: 20px;
}

/* .header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
} */

/* .back-button {
    font-size: 30px;
    border: none;
    background: none;
    cursor: pointer;
} */

.profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
}

.profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #00BFA5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    background: url("../../../public/img/accessories-8826708_640.jpg") no-repeat center/cover;
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

.buttons button {
    color: inherit;
}

.secession {
    display: inline-block;
    width: 100%;
}

.info-button,
.logout-button {
    padding: 10px 20px;
    border: 1px solid var(--input-border-color);
    border-radius: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
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
</style>