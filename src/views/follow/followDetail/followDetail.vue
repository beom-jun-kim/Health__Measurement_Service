<template>
    <div class="container">
        <GoBack />
        <div class="detail-info">
            <div class="profile-box">
                <div v-if="user.imgUrl" class="user-img-box">
                    <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
                </div>
                <div v-else class="user-img-box">
                    <div class="user-not-profile"></div>
                </div>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="user-info-box">
                <div class="user-info">
                    <p>아이디</p>
                    <p>성별</p>
                    <p>생년월일</p>
                </div>
                <div>
                    <p class="username">{{ user.userId }}</p>
                    <p class="username">{{ user.gender === "M" ? "남" : "여" }}</p>
                    <p class="username">{{ user.birthday }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import Follow from "@/api/Follow"
import GoBack from "@/components/GoBack.vue"

export default {
    name: "followDetail",
    components: {
        GoBack,
    },
    data() {
        return {
            user: {},
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
    },
    async mounted() {
        await this.getFollowReqDetail(this.$route.params.id);
    }
}
</script>


<style scoped>
.container {
    padding: 20px;
}

.detail-info {
    width: 60%;
}

.profile-box {
    text-align: center;
    margin-bottom: 30px;
}

.user-img-box {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--input-border-color);
    margin: 0 auto 5px;
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

.user-info-box {
    display: flex;
    justify-content: space-between;
}

.user-info-box p {
    margin-bottom: 15px;
}

.user-info {
    color: var(--main-color);
}
</style>