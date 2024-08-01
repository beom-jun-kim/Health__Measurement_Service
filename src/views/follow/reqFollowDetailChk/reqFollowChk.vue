<template>
    <div class="req-follow-chk-list-container margin-bottom-zero">
        <div class="question">
            <h3>
                <h2>{{ user.name }}</h2> 님께서<br>
                친구추가를 요청하였습니다.<br>
                수락하시겠습니까?
            </h3>
        </div>
        <div class="list-box-wrap">
            <div v-if="user.imgUrl" class="user-img-box">
                <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
            </div>
            <div v-else class="user-img-box">
                <div class="user-not-profile"></div>
            </div>
            <span class="username">{{ user.name }}</span>
        </div>
        <div class="follow-res-buttons">
            <button @click="accept">수락하기</button>
            <button @click="reject">거절하기</button>
            <button>
                <RouterLink :to="`/follow/followDetail/${user.userSid}`">
                    정보보기
                </RouterLink>
            </button>
        </div>
    </div>
</template>

<script>
import Follow from "@/api/Follow"

export default {
    name: "reqFollowChk",
    data() {
        return {
            user: {}
        }
    },
    methods: {
        async getFollowReqDetail(id) {
            try {
                const response = await Follow.getFollowReqDetail(id)
                this.user = response.data;
            } catch (error) {
                console.log("요청 보호자 상세보기 실패", error);
            }
        },
        async accept() {
            try {
                const data = {
                    guardianSid: this.$route.params.id,
                }
                await Follow.followReqAccept(data)
                alert("수락하시겠습니까?");
                alert("수락되었습니다");
                this.$router.push("/follow/followList");
            } catch (error) {
                console.log("수락하기 실패", error);
            }
        },
        async reject() {
            try {
                await Follow.followReqDel(this.$route.params.id)
                alert("거절하시겠습니까?");
                alert("거절되었습니다");
                this.$router.push("/follow/reqFollowList");
            } catch (error) {
                console.log("거절하기 실패", error);
            }
        },
    },
    async mounted() {
        await this.getFollowReqDetail(this.$route.params.id);
    }
}
</script>

<style scoped>
.req-follow-chk-list-container {
    padding: 20px;
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.list-box-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.user-img-box {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--input-border-color);
    margin: 20px 0 10px;
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

.question {
    font-size: var(--font-b-size);
}

.question h3 {
    color: var(--main-color);
}

.question h2 {
    display: inline-block;
    color: #111;
}

.follow-res-buttons {
    display: flex;
    justify-content: space-between;
    gap: 7px;
    margin-top: 20px;
}

.follow-res-buttons button {
    flex: 1;
    padding: 12px 10px;
    border-radius: 5px;
    font-size: var(--font-n-size);
}

.follow-res-buttons button:first-child {
    background: var(--main-color);
    color: #fff;
    border: none;
}

.follow-res-buttons button:nth-child(2) {
    background: #b2b2b2;
    color: #fff;
    border: none;
}

.follow-res-buttons button:last-child {
    background: none;
    border: 1px solid var(--main-color);
    position: relative;
}

.follow-res-buttons button:last-child a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #111;
}
</style>