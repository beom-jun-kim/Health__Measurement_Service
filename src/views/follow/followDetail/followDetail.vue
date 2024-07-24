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
                <span class="username">{{ user.username }}</span>
            </div>
            <div class="user-info-box">
                <div class="user-info">
                    <p>연락처</p>
                    <p>아이디</p>
                    <p>성별</p>
                    <p>생년월일</p> 
                </div>
                <div>
                    <p class="username">{{ user.phone }}</p>
                    <p class="username">{{ user.userId }}</p>
                    <p class="username">{{ user.gender }}</p>
                    <p class="username">{{ user.birth }}</p>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import GoBack from "@/components/GoBack.vue"

export default {
    name: "followDetail",
    components: {
        GoBack,
    },
    data() {
        return {
            user: {
                id: 1,
                username: "김범준",
                imgUrl: '../../../public/img/accessories-8826708_640.jpg',
                phone: "010-3395-2934",
                userId: "gcon1945",
                gender: "남",
                birth:"1995.12.05"
            },
        }
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
    background: url("../../../public/img/empty_person.png") no-repeat center/cover;
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