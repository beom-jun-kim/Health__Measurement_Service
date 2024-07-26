<template>
    <div class="container">
        <!-- <GoBack /> -->
        <div class="add-follow-title">
            <h3>친구추가하기</h3>
            <p>아이디 혹은 전화번호로 친구추가가 가능합니다.</p>
        </div>
        <div class="radio-box">
            <div class="radio-box-wrap">
                <input type="radio" id="addId" name="addId" v-model="addRadio" value="id">
                <label for="addId">아이디로 추가하기</label>
            </div>
            <div class="radio-box-wrap">
                <input type="radio" id="addPhone" name="addId" v-model="addRadio" value="phone">
                <label for="addPhone">전화번호로 추가하기</label>
            </div>
        </div>
        <div class="add-friend-wrap" v-if="addRadio === 'id'">
            <div class="add-friend">
                <h3>아이디로 친구 찾기</h3>
                <input type="text" id="userId" name="userId" placeholder="추가할 유저의 아이디를 입력" v-model="findIdChk">
                <button class="add-fri-btn" @click="findIdAdd">확인</button>
            </div>
            <div v-if="followIdBox" class="profile-box">
                <div v-if="foundIdUser">
                    <div class="user-img-box" v-if="foundIdUser.imgUrl">
                        <div class="user-profile" :style="{ backgroundImage: `url(${foundIdUser.imgUrl})` }"></div>
                    </div>
                    <div v-else class="user-img-box">
                        <div class="user-not-profile"></div>
                    </div>
                    <p class="username">{{ foundIdUser.username }}</p>
                    <button class="req-follow" @click="addRequest(foundIdUser.id)">친구 신청하기</button>
                    <!-- <button class="req-follow" @click="addRequest(foundIdUser.id)" @click="cancelRequest">신청 취소</button>
                    <button class="req-follow" @click="addRequest(foundIdUser.id)" >친구 신청하기</button> -->
                </div>
                <div v-else>
                    <p>해당 유저가 없습니다</p>
                </div>
            </div>
        </div>
        <div class="add-friend-wrap" v-if="addRadio === 'phone'">
            <div class="add-friend">
                <h3>연락처로 친구 찾기</h3>
                <input type="text" id="usePhone" name="usePhone" placeholder="'-'를 제외하고 입력" v-model="findPhoneChk">
                <button class="add-fri-btn" @click="findPhoneAdd">확인</button>
            </div>
            <div v-if="followPhoneBox" class="profile-box">
                <div v-if="foundPhoneUser">
                    <div class="user-img-box" v-if="foundPhoneUser.imgUrl">
                        <div class="user-profile" :style="{ backgroundImage: `url(${foundPhoneUser.imgUrl})` }"></div>
                    </div>
                    <div v-else class="user-img-box">
                        <div class="user-not-profile"></div>
                    </div>
                    <p class="username">{{ foundPhoneUser.username }}</p>
                    <button class="req-follow" @click="addRequest(foundPhoneUser.id)">친구 신청하기</button>
                    <!-- <button class="req-follow" @click="addRequest(foundIdUser.id)" @click="cancelRequest">신청 취소</button>
                    <button class="req-follow" @click="addRequest(foundIdUser.id)" >친구 신청하기</button> -->
                </div>
                <div v-else>
                    <p>해당 유저가 없습니다</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Follow from '@/api/Follow';

export default {
    name: "addFollow",
    // components: {
    //     GoBack,
    // }, 
    data() {
        return {
            userList: [],
            findIdChk: "",
            findPhoneChk: "",
            followIdBox: false,
            followPhoneBox: false,
            foundIdUser: null,
            foundPhoneUser: null,
            addRadio: "id",
        }
    },
    methods: {
        async findIdAdd() {
            try {
                const response = await Follow.getFollowId();
                console.log("친구 조회 성공", response);
                this.userList = response.data;
                const user = this.userList.find((user) => user.userId === this.findIdChk);
                if (user) {
                    this.foundIdUser = user;
                    this.followIdBox = true;
                } else {
                    this.foundIdUser = null;
                    this.followIdBox = true;
                }
            } catch (error) {
                console.log("아이디로 찾기 실패", error);
            }
        },
        findPhoneAdd() {
            const formattedPhone = this.formatPhone(this.findPhoneChk);
            console.log("formattedPhone", formattedPhone);
            const user = this.userList.find((user) => user.phone === formattedPhone);
            console.log("user", user);
            if (user) {
                this.foundPhoneUser = user;
                this.followPhoneBox = true;
            } else {
                this.foundPhoneUser = null;
                this.followPhoneBox = true;
            }
        },
        formatPhone(phone) {
            if (phone.length === 11) {
                return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            } else if (phone.length === 10) {
                return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
            return phone;
        },
        addRequest(userId) {
            try {
                // 신청 로직 작성
            } catch (error) {
                console.log("친구추가 요청 실패", error);
            }
        },
        cancelRequest() {
            try {
                // 신청취소 로직 작성
            } catch (error) {
                console.log("친구추가 요청 실패", error);
            }
        }
    },
}
</script>

<style scoped>
.container {
    padding: 20px;
}

.add-friend {
    width: 100%;
}

.add-friend h3 {
    color: var(--main-color);
}

.add-friend input {
    border: 1px solid var(--input-border-color);
    width: 80%;
    height: 35px;
    margin: 10px 10px 30px 0;
    padding: 0 5px;
    font-size: var(--font-n-sec-size);
}

.add-follow-title {
    border-bottom: 1px solid var(--input-border-color);
    width: 100%;
    padding-bottom: 10px;
}

.add-follow-title h3 {
    margin-bottom: 10px;
    color: var(--main-color);
}

.add-friend button {
    height: 35px;
    padding: 0 10px;
    background: #8c8c8c;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: var(--font-n-size);
    transform: translateY(1px);
}

.profile-box {
    text-align: center;
    margin-bottom: 30px;
    background: #ebebeb;
    width: 100%;
    width: 100%;
    padding: 20px 0;
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

.req-follow {
    background: var(--main-color);
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 5px;
    color: #fff;
    letter-spacing: 1px;
    font-size: var(--font-n-sec-size);
}

.radio-box {
    display: flex;
    width: 100%;
    margin: 25px 0;
}

.radio-box .radio-box-wrap {
    white-space: nowrap;
}

.radio-box .radio-box-wrap:first-child {
    margin-right: 40px;
}

.radio-box input {
    margin-right: 7px;
    accent-color: #111;
}

.add-friend-wrap {
    width: 100%;
}
</style>