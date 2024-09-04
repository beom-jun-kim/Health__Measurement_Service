<template>
    <div class="container">
        <GoBack :goBackText="goBackText"/>
        <div class="follow-list">
            <h2>보호자 추가 신청</h2>
            <p>나의 보호자로 신청한 보호자 리스트입니다.</p>
        </div>
        <div v-if="userList.length > 0" class="list-box" v-for="(user, index) in userList" :key="index">
            <div class="list-box-wrap">
                <!-- <div v-if="user.imgUrl" class="user-img-box">
                    <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
                </div>
                <div v-else class="user-img-box">
                    <div class="user-not-profile"></div>
                </div> -->
                <RouterLink :to="`/follow/followDetail/${user.userSid}`" class="user-profile-detail">
                    <div v-if="user.gender === 'F'" class="profile-img">
                        <img src="@/assets/img/charac_w.png" alt="프로필 이미지">
                    </div>
                    <div v-if="user.gender === 'M'" class="profile-img">
                        <img src="@/assets/img/charac_m.png" alt="프로필 이미지">
                    </div>
                    <div class="user-profile-info">
                        <p class="username">{{ user.name }}</p>
                        <div class="more-profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M15 7L10 12L15 17" stroke="#b7b7b7" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <small>더보기</small>
                        </div>
                    </div>
                </RouterLink>
                <div class="follow-res-buttons">
                    <button @click="accept(user.userSid)">수락</button>
                    <button @click="reject(user.userSid)">거절</button>
                </div>
            </div>
        </div>
        <div v-else class="not-list">
            <p style="text-align: center;">추가를 요청한 보호자가 없습니다.</p>
        </div>
    </div>
</template>

<script>
import Follow from "@/api/Follow";
import GoBack from "@/components/GoBack.vue";

export default {
    name: "reqFollowList",
    components:{
        GoBack,
    },
    data() {
        return {
            userList: [],
            goBackText:"요청 친구 리스트"
        }
    },
    methods: {
        async getFollowReceptionList() {
            try {
                const response = await Follow.getFollowReceptionList();
                this.userList = response.data
            } catch (error) {
                console.log("보호자 요청 리스트 조회 실패", error);
            }
        },
        async accept(userId) {
            if (confirm("수락하시겠습니까?")) {
                try {
                    const data = {
                        guardianSid: userId,
                    }
                    await Follow.followReqAccept(data)
                    alert("수락되었습니다");
                    this.$router.push("/follow/followList");
                } catch (error) {
                    console.log("수락하기 실패", error);
                }
            }
        },
        async reject(userId) {
            if (confirm("거절하시겠습니까?")) {
                try {
                    await Follow.followReqDelGuar(userId)
                    alert("거절되었습니다");
                    await this.getFollowReceptionList();
                    this.$router.push("/follow/reqFollowList");
                } catch (error) {
                    console.log("거절하기 실패", error);
                }
            }
        },
    },
    async mounted() {
        this.getFollowReceptionList();
    }
}
</script>

<style scoped>
.container {
    padding: 20px;
}

.component-box {
    padding: 20px 0;
    word-break: keep-all;
    width: 100%;
}

.follow-list {
    width: 100%;
    padding-bottom: 20px;
}

.follow-list h2 {
    font-size: var(--font-n-size);
}

.follow-list p {
    font-size: var(--font-n-sec-size);
}

.add-follow-btn {
    padding: 0 10px;
    text-align: right;
    width: 110px;
    height: 35px;
    background: url("@/assets/img/empty_person_add_black.png") no-repeat left 10px center / 20px auto;
    border-radius: 5px;
    border: 1px solid #000;
    font-size: var(--font-n-sec-size);
    color: #111;
}

.user-img-box {
    width: 50px;
    height: 50px;
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

.follow-detail-btn,
.del-btn {
    margin-left: 10px;
}

.list-box {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.list-box .username {
    margin-left: 10px;
    font-weight: var(--font-b-weight);
}

.list-box-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.1);
    padding: 7px;
    border-radius: var(--border-radius);
}

.follow-res-buttons button {
    padding: 5px 12px;
    border-radius: var(--border-radius);
    border: none;
    font-size: var(--input-font-size);
}

.follow-res-buttons button:first-child {
    background: var(--main-color);
    color: #fff;
    border: 1px solid var(--main-color);
}

.follow-res-buttons button:last-child {
    border: 1px solid var(--main-color);
    background: none;
    margin-left: 7px;
    color: var(--main-color);
}

.follow-detail-btn {
    background: var(--main-color);
}

.del-btn {
    background: var(--input-border-color);
}

.not-list {
    width: 100%;
    background: #ebebeb;
    padding: 10px 0;
}

.profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid var(--input-border-color);
    overflow: hidden;
    text-align: center;
    margin-right: 5px;
}

.profile-img img {
    height: 100%;
}

.more-profile svg {
    vertical-align: middle;
    margin-right: 2px;
}

.more-profile small {
    color: var(--light-font-color);
    font-weight: var(--font-t-weight);
}

.user-profile-detail {
    display: flex;
}
</style>