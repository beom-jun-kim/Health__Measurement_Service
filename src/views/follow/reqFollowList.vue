<template>
    <div class="container">
        <div class="follow-list">
            <h2>보호자 추가 신청</h2>
            <p>나를 보호자로 신청한 보호자 리스트입니다.</p>
        </div>
        <div v-if="userList.length > 0" class="list-box" v-for="(user, index) in userList" :key="index">
            <div class="list-box-wrap">
                <!-- <div v-if="user.imgUrl" class="user-img-box">
                    <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
                </div>
                <div v-else class="user-img-box">
                    <div class="user-not-profile"></div>
                </div> -->
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="list-box-wrap">
                <RouterLink :to="`/follow/reqFollowDetailChk/${user.userSid}`">
                    <button class="follow-detail-btn">확인하기</button>
                </RouterLink>
            </div>
        </div>
        <div v-else class="not-list">
            <p style="text-align: center;">추가를 요청한 보호자가 없습니다.</p>
        </div>
    </div>
</template>

<script>
import Follow from "@/api/Follow";

export default {
    name: "reqFollowList",
    data() {
        return {
            userList: [],
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
        }
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

.tab-menu {
    width: 100%;
    display: flex;

}

.tab-menu button {
    width: 100%;
    padding: 10px 8.421052631578947vw;
    color: #aaa;
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--font-n-size);
    border-bottom: 2px solid var(--input-border-color);
    word-break: keep-all;
}

.tab-menu .active-tab {
    color: #000;
    font-weight: var(--font-b-weight);
    border-bottom: 6px solid var(--main-color);
}

.component-box {
    padding: 20px 0;
    word-break: keep-all;
    width: 100%;
}

.follow-list {
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 15px;
    border-bottom: 2px solid var(--input-border-color);
}

.follow-list h2 {
    color: var(--main-color);
    margin-bottom: 10px;
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
    align-items: center;
}

.list-box-wrap button {
    color: #fff;
    font-size: var(--font-n-sec-size);
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
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
</style>