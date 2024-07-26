<template>
    <div class="container">
        <div class="tab-menu">
            <button :class="{ 'active-tab': currentComponent === 'GuardianList' }"
                @click="updateState('GuardianList')">나의 보호자</button>
            <button :class="{ 'active-tab': currentComponent === 'Protector' }"
                @click="updateState('Protector')">나의 보호인</button>
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
    components:{
        GuardianList,
        Protector,
    },
    data() {
        return {
            userList: [
                {
                    id: 1,
                    username: "김범준",
                    imgUrl: '@/assets/img/accessories-8826708_640.jpg',
                },
                {
                    id: 2,
                    username: "최지콘",
                    imgUrl: "",
                },
                {
                    id: 3,
                    username: "박메라",
                    imgUrl: "",
                },
            ],
            currentComponent: 'GuardianList',
        }
    },
    methods: {
        updateState(componentName){
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