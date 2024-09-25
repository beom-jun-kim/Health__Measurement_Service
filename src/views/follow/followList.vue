<template>
    <div class="container">
        <GoBack :goBackText="goBackText" />
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
import GoBack from "@/components/GoBack.vue";

export default {
    name: "followList",
    components: {
        GuardianList,
        Protector,
        GoBack,
    },
    data() {
        return {
            userList: [],
            currentComponent: 'GuardianList',
            addFollowIcon: true,
            goBackText: "친구 리스트"
        }
    },
    methods: {
        updateState(componentName) {
            this.currentComponent = componentName;
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
    white-space: nowrap;
    font-weight: var(--font-t-weight);
}

.tab-menu .active-tab {
    color: var(--main-color);
    font-weight: var(--font-b-weight);
    border-bottom: 4px solid var(--main-color);
}

.component-box {
    /* padding: 20px 0; */
    word-break: keep-all;
    width: 100%;
}
</style>