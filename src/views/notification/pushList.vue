<template>
    <div class="container">
        <GoBack />
        <RouterLink class="push-move" :to="push.categoryName" v-for="(push, index) in pushList" :key="index"
            :class="{ 'unRead': push.readCk === false }" @click="readChk(push.notificationSid)">
            <div class="push-list">
                <div class="push-list-img">
                    <img src="@/assets/img/alarm_mint.png" alt="">
                </div>
                <div class="push-info">
                    <p class="push-text">{{ push.message }}</p>
                    <small class="push-create">{{ push.createDate }}</small>
                </div>
                <!-- <small class="push-nuread" v-if="push.readCk === false">읽지않음</small> -->
            </div>
        </RouterLink>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue"
import Push from "@/api/Push"

export default {
    name: "pushList",
    data() {
        return {
            pushList: []
        }
    },
    components: {
        GoBack,
    },
    methods: {
        async getPushList() {
            try {
                const response = await Push.pushList();
                console.log(response.data);
                this.pushList = response.data;
            } catch (error) {
                console.log("알림 리스트 조회 실패", error);
            }
        },
        async readChk(pushListId) {
            console.log("pushListId", pushListId);
            try {
                const data = {
                    notificationSid: pushListId,
                }
                const response = await Push.newPush(data);
                console.log("response", response);
            } catch (error) {
                console.log("읽음처리 실패", error);
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
    padding: 20px;
}

.push-list {
    border-bottom: 1px solid var(--input-border-color);
    width: 100%;
    padding: 10px 15px;
    position: relative;
    display: flex;
    align-items: center;
}

.push-list-img {
    width: 20px;
    margin-right: 15px;
}

.push-create {
    color: #5c5c5c;
}

.push-move {
    width: 100%;
    padding: 0;
}

.push-move.unRead {
    background: #e6e6e67b;
}

/* .push-nuread {
    position: absolute;
    right: 15px;
    bottom: 11px;
    color: #5c5c5c;
} */
</style>