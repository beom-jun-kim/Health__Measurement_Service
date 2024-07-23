<template>
    <div class="container">
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
    },
    methods: {
        updateState(componentName) {
            this.currentComponent = componentName;
        }
    }
};
</script>

<style scoped>
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
    height: 400px;
}
</style>