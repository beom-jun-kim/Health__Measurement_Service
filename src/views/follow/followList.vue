<template>
    <div class="container">
        <div class="follow-list">
            <h2>친구리스트</h2>
            <div class="add-follow-icon">
                <RouterLink to="/follow/addFollow">
                    <div class="req-chk-icon">
                        <button class="add-follow-btn">
                            추가하기
                        </button>
                    </div>
                </RouterLink>
                <RouterLink to="/follow/reqFollowList">
                    <img src="@/assets/img/alarm_mint.png" alt="친구리스트 알림 이미지">
                    <div v-if="addFollowIcon" class="new-icon-box">
                        <div class="new-icon">N</div>
                    </div>
                </RouterLink>
            </div>
        </div>
        <div class="tab-menu">
            <button :class="{ 'active-tab': currentComponent === 'GuardianList' }"
                @click="updateState('GuardianList')">나의 보호자</button>
            <button :class="{ 'active-tab': currentComponent === 'Protector' }" @click="updateState('Protector')">나의
                보호인</button>
        </div>
        <div class="component-box">
            <component :is="currentComponent"></component>
        </div>
    </div>
</template>

<script>
import GuardianList from "@/components/GuardianList.vue";
import Protector from "@/components/Protector.vue";

export default {
    name: "followList",
    components: {
        GuardianList,
        Protector,
    },
    data() {
        return {
            userList: [],
            currentComponent: 'GuardianList',
            addFollowIcon:true,
        }
    },
    methods: {
        updateState(componentName) {
            this.currentComponent = componentName;
        },
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    color: var(--main-color);
    font-size: var(--font-n-size);
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

.add-follow-icon {
    display: flex;
    align-items: center;
}

.add-follow-icon a:last-child {
    margin-left: 10px;
    width: 30px;
    transform: translateY(2px);
}

.req-chk-icon {
    position: relative;
}

.new-icon-box {
    border: 1px solid red;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    color: red;
    text-align: center;
    line-height: 15px;
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 11px;
    background: #fff;
    font-weight: var(--font-b-weight);
}
</style>