<template>
    <div class="container">
        <GoBack />
        <div class="tab-menu">
            <button :class="{ 'active-tab': currentComponent === 'FindId' }"
                @click="updateState('FindId')">아이디찾기</button>
            <button :class="{ 'active-tab': currentComponent === 'FindPassword' }"
                @click="updateState('FindPassword')">비밀번호 찾기</button>
        </div>
        <div class="component-box">
            <component :is="currentComponent"></component>
        </div>
    </div>
</template>

<script>
import FindId from "@/components/FindId.vue";
import FindPassword from "@/components/FindPassword.vue";
import GoBack from "@/components/GoBack.vue"

export default {
    name: 'userIdFind',
    data() {
        return {
            currentComponent: 'FindId',
        }
    },
    components: {
        FindId,
        FindPassword,
        GoBack,
    },
    methods: {
        updateState(componentName) {
            this.currentComponent = componentName;
        }
    }
};
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
    padding: 20px 0;
    word-break: keep-all;
    height: 400px;
}
</style>