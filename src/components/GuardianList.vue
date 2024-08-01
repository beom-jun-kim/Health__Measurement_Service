<template>
    <div v-if="userList.length > 0" class="list-box" v-for="(user, index) in userList" :key="index">
        <div class="list-box-wrap">
            <div v-if="user.imgUrl" class="user-img-box">
                <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
            </div>
            <div v-else class="user-img-box">
                <div class="user-not-profile"></div>
            </div>
            <span class="username">{{ user.name }}</span>
        </div>
        <div class="list-box-wrap">
            <RouterLink :to="`/follow/followDetail/${user.userSid}`">
                <button class="follow-detail-btn">상세보기</button>
            </RouterLink>
            <button class="del-btn" @click="delFollow(user.userSid)">삭제</button>
        </div>
    </div>
    <div v-else class="not-list">
        <p style="text-align: center;">나의 보호자가 등록되어 있지 않습니다.</p>
    </div>
</template>

<script>
import Follow from '@/api/Follow';

export default {
    name: "GuardianList",
    data() {
        return {
            userList: [],
            user: {},
        }
    },
    methods: {
        async delFollow(userSid) {
            if (confirm("친구를 삭제하시겠습니까?")) {
                try {
                    await Follow.followReqDel(userSid)
                    await this.getFollowList();
                } catch (error) {
                    console.log("삭제하기 실패", error);
                }
            }
        },
        async getFollowList() {
            try {
                const response = await Follow.getFollowGList();
                this.userList = response.data;
            } catch (error) {
                console.log("나의 보호자 리스트 조회실패", error);
            }
        },
    },
    async mounted() {
        await this.getFollowList();
    }
}
</script>

<style scoped>
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
    background: #ebebeb;
    padding: 10px 0;
}
</style>