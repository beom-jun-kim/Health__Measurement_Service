<template>
    <div class="move-add-follow-btn">
        <RouterLink to="/follow/addFollow">
            <button class="add-follow-btn">
                <span>+</span>
                <span>추가하기</span>
            </button>
        </RouterLink>
    </div>
    <div v-if="userList.length > 0" class="list-box" v-for="(user, index) in userList" :key="index">
        <RouterLink :to="`/follow/followDetail/${user.userSid}`">
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
            </div>
        </RouterLink>
        <div class="follow-res-buttons">
            <RouterLink :to="`/user/reportList/${user.userSid}`">
                <button class="follow-detail-btn">상세보기</button>
            </RouterLink>
            <button class="del-btn" @click="delFollow(user.userSid)">삭제</button>
        </div>
    </div>
    <div v-else class="not-list">
        <p style="text-align: center;">나의 보호인이 등록되어 있지 않습니다.</p>
    </div>
</template>

<script>
import Follow from '@/api/Follow';

export default {
    name: "GuardianList",
    data() {
        return {
            userList: [],
        }
    },
    methods: {
        async delFollow(userSid) {
            if (confirm("친구를 삭제하시겠습니까?")) {
                try {
                    await Follow.followReqDelPro(userSid)
                    await this.getFollowList();
                } catch (error) {
                    console.log("삭제하기 실패", error);
                }
            }
        },
        async getFollowList() {
            try {
                const response = await Follow.getFollowPList();
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
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.1);
    padding: 7px;
    border-radius: var(--border-radius);
    margin: 10px 0;
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

.move-add-follow-btn {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
}

.add-follow-btn {
    font-size: var(--input-font-size);
    padding: 0 10px;
    width: 90px;
    height: 32px;
    /* background: url("@/assets/img/empty_person_add_black.png") no-repeat left 10px center / 20px auto; */
    border-radius: var(--border-radius);
    border: none;
    color: #fff;
    background: var(--main-color);
    display: flex;
    align-items: center;
}

.add-follow-btn span:first-child {
    font-size: var(--font-b-size);
    margin-right: 5px;
}

.user-profile-detail {
    display: flex;
}

.follow-res-buttons button {
    padding: 5px 12px;
    border-radius: var(--border-radius);
    font-size: var(--input-font-size);
}

.follow-res-buttons .follow-detail-btn {
    background: var(--main-color);
    color: #fff;
    border: 1px solid var(--main-color);
}

.follow-res-buttons .del-btn {
    border: 1px solid var(--main-color);
    background: none;
    margin-left: 7px;
    color: var(--main-color);
}

.move-add-follow-btn {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
}

.add-follow-btn {
    font-size: var(--input-font-size);
    padding: 0 10px;
    width: 90px;
    height: 32px;
    /* background: url("@/assets/img/empty_person_add_black.png") no-repeat left 10px center / 20px auto; */
    border-radius: var(--border-radius);
    border: none;
    color: #fff;
    background: var(--main-color);
    display: flex;
    align-items: center;
}

.add-follow-btn span:first-child {
    font-size: var(--font-b-size);
    margin-right: 5px;
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
</style>