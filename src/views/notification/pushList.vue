<template>
    <div class="container">
        <div class="go-back-box">
            <GoBack :goBackText="goBackText" />
        </div>
        <template v-if="pushList.length > 0">
            <small class="desc">최근 7일간의 알림만 표시됩니다</small>
            <RouterLink class="push-move" :to="push.categoryName" v-for="(push, index) in pushList" :key="index"
                :class="{ 'unRead': push.readCk === false }" @click="readChk(push.notificationSid)">
                <div class="push-list">
                    <div class="push-list-img">
                        <div
                            v-if="push.categoryName === '/follow/followList' || push.categoryName === '/follow/reqFollowList'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 16 16"
                                fill="#36b1a7" class="bi bi-people-fill">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fill-rule="evenodd"
                                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                            </svg>
                        </div>
                        <div v-if="push.categoryName.includes('/user/reportList')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#36b1a7" width="20px" height="20px"
                                viewBox="0 0 32 32" id="icon">
                                <rect x="10" y="18" width="8" height="2" />
                                <rect x="10" y="13" width="12" height="2" />
                                <rect x="10" y="23" width="5" height="2" />
                                <path
                                    d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z" />
                            </svg>
                        </div>
                    </div>
                    <div class="push-info">
                        <div class="push-info-box"
                            v-if="push.categoryName === '/follow/followList' || push.categoryName === '/follow/reqFollowList'">
                            <small class="push-add-fri">친구추가</small>
                        </div>
                        <div v-if="push.categoryName.includes('/user/reportList')">
                            <small>측정결과</small>
                        </div>
                        <p class="push-text">{{ push.message }}</p>
                        <small class="push-create-before">{{ formatCreatedAtBefore(push.createDate) }}</small>
                    </div>
                    <small class="push-create">{{ formatCreatedAt(push.createDate) }}</small>
                </div>
            </RouterLink>
        </template>
        <template v-else>
            <p class="noList">새로운 알림이 없습니다</p>
        </template>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue"
import Push from "@/api/Push"

export default {
    name: "pushList",
    data() {
        return {
            pushList: [],
            goBackText: "알림",
        }
    },
    components: {
        GoBack,
    },
    methods: {
        async getPushList() {
            try {
                const response = await Push.pushList();
                this.pushList = response.data;
            } catch (error) {
                console.log("알림 리스트 조회 실패", error);
            }
        },
        async readChk(pushListId) {
            try {
                const data = {
                    notificationSid: pushListId,
                }
                await Push.newPush(data);
            } catch (error) {
                console.log("읽음처리 실패", error);
            }
        },
        formatCreatedAt(createdAt) {
            const options = {
                // year: "numeric",
                month: "short",
                day: "numeric",
            };
            const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(new Date(createdAt));
            return formattedDate;
        },
        formatCreatedAtBefore(createdAt) {
            const now = new Date();
            const createdDate = new Date(createdAt);
            const diffInSeconds = Math.floor((now - createdDate) / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInSeconds < 60) {
                return `${diffInSeconds}초 전`;
            } else if (diffInMinutes < 60) {
                return `${diffInMinutes}분 전`;
            } else if (diffInHours < 24) {
                return `${diffInHours}시간 전`;
            } else {
                return `${diffInDays}일 전`;
            }
        }
    },
    async mounted() {
        await this.getPushList();
    }
}
</script>

<style scoped>
.container {
    padding: 20px 0;
}

.go-back-box {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.push-list {
    width: 100%;
    padding: 15px 0;
    position: relative;
    display: flex;
}

.push-list-img {
    width: 20px;
    margin-right: 15px;
}

.push-info-box {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

.push-create {
    color: var(--main-color);
    position: absolute;
    right: 0;
}

.push-add-fri {
    color: var(--main-color);
    vertical-align: text-top;
}

.push-create-before {
    color: var(--light-font-color);
    font-weight: var(--font-t-weight);
}

.push-text {
    font-size: var(--input-font-size);
}

.push-move {
    width: 100%;
    padding: 0 30px;
}

.push-move.unRead {
    background-color: #effffd;
}

.noList {
    width: 100%;
    background: #ebebeb;
    padding: 10px 0;
    text-align: center;
}

.desc {
    text-align: left;
    width: 100%;
    padding: 10px 30px;
}
</style>