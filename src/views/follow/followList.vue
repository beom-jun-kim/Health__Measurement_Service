<template>
    <div class="container">
        <div class="follow-list">
            <h2>친구리스트</h2>
            <RouterLink to="/follow/addFollow">
                <button class="add-follow-btn">추가하기</button>
            </RouterLink>
        </div>
        <div class="list-box" v-for="(user, index) in userList" :key="index">
            <div class="list-box-wrap">
                <div v-if="user.imgUrl" class="user-img-box">
                    <div class="user-profile" :style="{ backgroundImage: `url(${user.imgUrl})` }"></div>
                </div>
                <div v-else class="user-img-box">
                    <div class="user-not-profile"></div>
                </div>
                <span class="username">{{ user.username }}</span>
            </div>
            <div class="list-box-wrap">
                <RouterLink :to="`/follow/followDetail/${user.id}`">
                    <button class="follow-detail-btn">상세보기</button>
                </RouterLink>
                <button class="del-btn" @click="delFollow">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "followList",
    data() {
        return {
            userList: [
                {
                    id: 1,
                    username: "김범준",
                    imgUrl: '../../../public/img/accessories-8826708_640.jpg',
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
        }
    },
    methods:{
        delFollow(){
            if(confirm("친구를 삭제하시겠습니까?")){
                try {
                    // 삭제로직 추가
                } catch (error) {
                    console.log("친구 삭제 실패",error);
                }
            }
        }
    }
}
</script>

<style scoped>
.follow-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--input-border-color);
    padding-bottom: 8px;
    color: var(--main-color);
    font-size: var(--font-n-size);
}

.add-follow-btn {
    padding: 0 10px;
    text-align: right;
    width: 110px;
    height: 35px;
    background: url("../../../public/img/empty_person_add_black.png") no-repeat left 10px center / 20px auto;
    border-radius: 5px;
    border: 1px solid #000;
    font-size: var(--font-n-sec-size);
}

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
    background: url("../../../public/img/empty_person.png") no-repeat center/cover;
}

.follow-detail-btn,
.del-btn {
    margin-left: 10px;
}

.list-box {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
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
</style>