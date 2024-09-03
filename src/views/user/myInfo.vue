<template>
    <div class="myInfo-container margin-bottom">
        <GoBack :goBackText="goBackText" />
        <div class="profile-section">
            <!-- <div class="profile-image">
                <div v-if="user.imgUrl" class="user-img-box">
                    <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
                </div>
                <div v-else class="user-img-box">
                    <div class="user-not-profile"></div>
                </div>
            </div> -->
            <div class="user-box">
                <div v-if="user.gender === 'F'" class="profile-img">
                    <img src="@/assets/img/charac_w.png" alt="프로필 이미지">
                </div>
                <div v-if="user.gender === 'M'" class="profile-img">
                    <img src="@/assets/img/charac_m.png" alt="프로필 이미지">
                </div>
                <div class="user-text-info">
                    <h2>
                        {{ user.name }} 님
                    </h2>
                    <span>안녕하세요 !</span>
                    <div class="buttons">
                        <RouterLink to="/user/userInfoEdit">
                            <button class="info-button">내정보 변경하기</button>
                        </RouterLink>
                        <button class="logout-button" @click="logout">로그아웃</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-section">
            <div class="info-item">
                <p class="label">연락처</p>
                <p class="value">{{ user.phoneNumber }}</p>
            </div>
            <div class="info-item">
                <p class="label">성별</p>
                <p class="value">{{ user.gender === "M" ? "남자" : user.gender === "F" ? "여자" : "입력하신 정보가 없습니다"}}</p>
            </div>
            <div class="info-item">
                <p class="label">생년월일</p>
                <p class="value">{{ user.birthday }}</p>
            </div>
            <div class="info-item">
                <span class="label">키</span>
                <span class="value">{{ user.height ? user.height : "정보가 없습니다." }}</span>
            </div>
            <div class="info-item">
                <span class="label">체중</span>
                <span class="value">{{ user.weight ? user.weight : "정보가 없습니다." }}</span>
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
    components: {
        GoBack,
    },
    data() {
        return {
            user: {},
            goBackText:"마이페이지"
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async logout() {
            if (confirm("로그아웃 하시겠습니까?")) {
                try {
                    await UserDataService.logout();
                    localStorage.removeItem('Authorization');
                    this.$router.push("/login/userLogin");
                } catch (error) {
                    console.log("로그아웃 실패", error);
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
.myInfo-container {
    padding: 20px 30px;
}

.profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid var(--input-border-color);
    overflow: hidden;
    text-align: center;
    margin-right: 15px;
}

.profile-img img {
    height: 100%;
}

.user-box {
    display: flex;
}

.profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* text-align: center; */
    margin-bottom: 20px;
}

.user-img-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--input-border-color);
}

.user-img-box .user-profile {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}

.user-not-profile {
    width: 100%;
    height: 100%;
    background: url("@/assets/img/empty_person.png") no-repeat center/cover;
}

.profile-section h2 {
    margin: 0 0 3px;
}

.profile-section p {
    margin: 0;
    color: #666;
}

.buttons {
    display: flex;
    gap: 6px;
    margin-top: 10px;
}

.buttons button {
    background: var(--main-color);
    color:#fff;
}

.secession {
    display: inline-block;
    width: 100%;
}


.info-button,
.logout-button {
    /* padding: 10px 20px; */
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    background-color: #f5f5f5;
    cursor: pointer;
    font-size: var(--input-font-size);
    height: 35px;
}

.info-button {
    width: 148.63px;
}

.logout-button {
    width: 100.89px;
    transform: translateY(3px);
}

.info-section {
    margin-bottom: 20px;
    font-size: var(--input-font-size);
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    margin-bottom: 20px;
}

.info-item:last-child {
    border-bottom: 1px solid var(--input-border-color);
    padding-bottom: 20px;
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