<template>
    <div class="list-box" v-for="(user, index) in userList" :key="index">
        <div class="list-box-wrap">
            <div v-if="user.imgUrl" class="user-img-box">
                <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
            </div>
            <div v-else class="user-img-box">
                <div class="user-not-profile"></div>
            </div>
            <span class="username">{{ user.username }}</span>
        </div>
        <div class="list-box-wrap">
            <RouterLink :to="`/follow/followDetail/${user.id}`">
                <button class="follow-detail-btn">상세보기</button>
            </RouterLink>
            <button class="del-btn" @click="delFollow">삭제</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "GuardianList",
    data() {
        return {
            userList: [
                {
                    id: 4,
                    username: "최기철",
                    imgUrl: '',
                },
                {
                    id: 5,
                    username: "박지훈",
                    imgUrl: '../img/accessories-8826708_640.jpg',
                },
            ],
        }
    },
    methods: {
        delFollow() {
            if (confirm("친구를 삭제하시겠습니까?")) {
                try {
                    // 삭제로직 추가
                } catch (error) {
                    console.log("친구 삭제 실패", error);
                }
            }
        },
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
</style>