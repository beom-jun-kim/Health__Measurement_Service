<template>
    <div class="container">
        <GoBack :goBackText="goBackText" />
        <!-- <div class="add-follow-title">
            <h3>친구추가하기</h3>
            <p>아이디 혹은 전화번호로 친구추가가 가능합니다.</p>
        </div> -->
        <div class="radio-box">
            <div class="radio-box-wrap">
                <input type="radio" id="addPhone" name="addId" v-model="addRadio" value="phone">
                <label for="addPhone">전화번호로 추가</label>
            </div>
            <div class="radio-box-wrap">
                <input type="radio" id="addId" name="addId" v-model="addRadio" value="id">
                <label for="addId">아이디로 추가</label>
            </div>
        </div>
        <div class="add-friend-wrap" v-if="addRadio === 'id'">
            <div class="add-friend">
                <!-- <h3>아이디로 친구 찾기</h3> -->
                <input type="text" id="userId" name="userId" placeholder="아이디 입력" v-model="findIdChk"
                    @keyup.enter="findIdAdd">
                <button class="add-fri-btn" @click="findIdAdd">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                            stroke="#36b1a7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div v-if="followIdBox" class="profile-box">
                <div v-if="foundIdUser">
                    <div class="profile-box-info">
                        <!-- <div class="user-img-box" v-if="foundIdUser.imgUrl">
                            <div class="user-profile" :style="{ backgroundImage: `url(${foundIdUser.imgUrl})` }"></div>
                        </div>
                        <div v-else class="user-img-box">
                            <div class="user-not-profile"></div>
                        </div> -->
                        <div v-if="foundIdUser.gender === 'F'" class="profile-img">
                            <img src="@/assets/img/charac_w.png" alt="프로필 이미지">
                        </div>
                        <div v-if="foundIdUser.gender === 'M'" class="profile-img">
                            <img src="@/assets/img/charac_m.png" alt="프로필 이미지">
                        </div>
                        <p class="username">{{ foundIdUser.name }}</p>
                        <small class="user-id">@{{ foundIdUser.userId }}</small>
                        <div v-if="foundIdUser.relationsStatus == null">
                            <button class="req-follow" @click="addRequest(foundIdUser.userSid)">친구 추가</button>
                        </div>
                        <div v-if="foundIdUser.relationsStatus === 'N'">
                            <button class="req-follow" @click="cancelRequest(foundIdUser.userSid)">신청 취소</button>
                        </div>
                        <div v-if="foundIdUser.relationsStatus === 'Y'">
                            <p>친구가 되어있습니다</p>
                        </div>
                    </div>
                </div>
                <div class="no-search" v-else>
                    <p>해당 유저가 검색되지 않습니다</p>
                </div>
            </div>
        </div>
        <div class="add-friend-wrap" v-if="addRadio === 'phone'">
            <div class="add-friend">
                <!-- <h3>연락처로 친구 찾기</h3> -->
                <input type="text" id="usePhone" name="usePhone" placeholder="'-'를 제외하고 입력" v-model="findPhoneChk"
                    @keyup.enter="findPhoneAdd">
                <button class="add-fri-btn" @click="findPhoneAdd">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                            stroke="#36b1a7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div v-if="followPhoneBox" class="profile-box">
                <div v-if="foundPhoneUser">
                    <div class="profile-box-info">
                        <!-- <div class="user-img-box" v-if="foundPhoneUser.imgUrl">
                            <div class="user-profile" :style="{ backgroundImage: `url(${foundPhoneUser.imgUrl})` }"></div>
                        </div>
                        <div v-else class="user-img-box">
                            <div class="user-not-profile"></div>
                        </div> -->
                        <div v-if="foundPhoneUser.gender === 'F'" class="profile-img">
                            <img src="@/assets/img/charac_w.png" alt="프로필 이미지">
                        </div>
                        <div v-if="foundPhoneUser.gender === 'M'" class="profile-img">
                            <img src="@/assets/img/charac_m.png" alt="프로필 이미지">
                        </div>
                        <p class="username">{{ foundPhoneUser.name }}</p>
                        <small class="user-id">@{{ foundPhoneUser.userId }}</small>
                        <div v-if="foundPhoneUser.relationsStatus == null">
                            <button class="req-follow" @click="addPhoneRequest(foundPhoneUser.userSid)">친구 추가</button>
                        </div>
                        <div v-if="foundPhoneUser.relationsStatus === 'N'">
                            <button class="req-follow" @click="cancelPhoneRequest(foundPhoneUser.userSid)">신청
                                취소</button>
                        </div>
                        <div v-if="foundPhoneUser.relationsStatus === 'Y'">
                            <p>친구가 되어있습니다</p>
                        </div>
                    </div>
                </div>
                <div class="no-search" v-else>
                    <p>해당 유저가 검색되지 않습니다</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Follow from '@/api/Follow';
import GoBack from "@/components/GoBack.vue";

export default {
    name: "addFollow",
    components: {
        GoBack,
    },
    data() {
        return {
            user: {},
            findIdChk: "",
            findPhoneChk: "",
            followIdBox: false,
            followPhoneBox: false,
            foundIdUser: null,
            foundPhoneUser: null,
            addRadio: "phone",
            goBackText: "친구추가",
        }
    },
    methods: {
        async findIdAdd() {
            try {
                const response = await Follow.getFollowId(this.findIdChk);
                this.user = response.data;
                if (this.user.userId === this.findIdChk) {
                    this.foundIdUser = this.user;
                    this.followIdBox = true;
                } else {
                    this.foundIdUser = null;
                    this.followIdBox = true;
                }
            } catch (error) {
                console.log("아이디로 찾기 실패", error);
            }
        },
        async findPhoneAdd() {
            const findPhoneChk = Number(this.findPhoneChk);
            if (isNaN(findPhoneChk)) {
                alert("번호를 입력하여주세요");
            } else {
                try {
                    const response = await Follow.getFollowPhone(this.findPhoneChk);
                    this.user = response.data;
                    if (this.user.phoneNumber === this.findPhoneChk) {
                        this.foundPhoneUser = this.user;
                        this.followPhoneBox = true;
                    } else {
                        this.foundPhoneUser = null;
                        this.followPhoneBox = true;
                    }
                } catch (error) {
                    console.log("휴대전화로 찾기 실패", error);
                }
            }
        },
        // formatPhone(phone) {
        //     if (phone.length === 11) {
        //         return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        //     } else if (phone.length === 10) {
        //         return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        //     }
        //     return phone;
        // },
        async addRequest(userId) {
            try {
                const data = {
                    userSid: userId,
                }
                await Follow.followReq(data);
                await this.findIdAdd(this.findIdChk);
            } catch (error) {
                console.log("친구추가 요청 실패", error);
            }
        },
        async cancelRequest(userId) {
            try {
                await Follow.followCancelReq(userId)
                await this.findIdAdd(this.findIdChk);
            } catch (error) {
                console.log("거절하기 실패", error);
            }
        },
        async addPhoneRequest(userId) {
            try {
                const data = {
                    userSid: userId,
                }
                await Follow.followReq(data);
                await this.findPhoneAdd(this.findPhoneChk);
            } catch (error) {
                console.log("친구추가 요청 실패", error);
            }
        },
        async cancelPhoneRequest(userId) {
            try {
                await Follow.followCancelReq(userId)
                await this.findPhoneAdd(this.findPhoneChk);
            } catch (error) {
                console.log("거절하기 실패", error);
            }
        }
    },
}
</script>

<style scoped>
/* .container {
    padding: 20px 30px;
} */

.add-friend {
    width: 100%;
    position: relative;
}

.add-friend h3 {
    color: var(--main-color);
}

.add-friend input {
    border-bottom: 2px solid var(--main-color);
    border-left: none;
    border-right: none;
    border-top: none;
    width: 100%;
    height: 35px;
    margin: 10px 10px 30px 0;
    padding: 0 5px 0 35px;
    font-size: var(--font-n-sec-size);
    -webkit-border-radius: 0;
}

.add-fri-btn {
    position: absolute;
    top: 15px;
    left: 0;
    background: none;
    border: none;
    outline: none;
}

/* .add-follow-title {
    border-bottom: 1px solid var(--input-border-color);
    width: 100%;
    padding-bottom: 10px;
}

.add-follow-title h3 {
    margin-bottom: 10px;
    color: var(--main-color);
} */

/* .add-friend button {
    height: 35px;
    padding: 0 10px;
    background: #8c8c8c;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: var(--font-n-size);
    transform: translateY(1px);
} */

.profile-box-info {
    text-align: center;
    margin-bottom: 30px;
    width: 100%;
    width: 100%;
    padding: 20px 0;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
}

.profile-box .username {
    margin-top: 5px;
    font-size: var(--font-n-size);
    font-weight: var(--font-b-weight);
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
    background: url("@/assets/img/empty_person.png") no-repeat center/cover;
}

.req-follow {
    background: var(--main-color);
    border: none;
    border-radius: 25px;
    padding: 7px 35px;
    margin-top: 5px;
    color: #fff;
    letter-spacing: 1px;
    font-size: var(--input-font-size);
}

.radio-box {
    display: flex;
    width: 100%;
    margin: 0 0 25px;
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

.profile-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid var(--input-border-color);
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
}

.profile-img img {
    height: 100%;
}

.user-id {
    color: var(--light-font-color);
    vertical-align: super;
}

.no-search {
    background: var(--input-border-color);
    padding: 10px 0;
    text-align: center;
}
</style>