<template>
    <div class="container">
        <GoBack :goBackText="goBackText" />
        <div class="page-title">
            <h2>성별을 입력하여주세요</h2>
            <p>회원님의 성별을 필수로 입력하여 주세요</p>
        </div>
        <div class="input-group">
            <p class="gender-text">성별</p>
            <div class="gender-img-wrap">
                <div class="gender-flex">
                    <label for="women">
                        <div class="gender-img">
                            <img src="@/assets/img/charac_w.png" alt="여자">
                        </div>
                    </label>
                    <div class="gender-box">
                        <input type="radio" id="women" v-model="gender" name="genderChk" value="F">
                        <label for="women" class="custom-radio">여자</label>
                    </div>
                </div>
                <div class="gender-flex">
                    <label for="man">
                        <div class="gender-img">
                            <img src="@/assets/img/charac_m.png" alt="남자">
                        </div>
                    </label>
                    <div class="gender-box">
                        <input type="radio" id="man" v-model="gender" name="genderChk" value="M">
                        <label for="man" class="custom-radio">남자</label>
                    </div>
                </div>
            </div>


        </div>
        <button class="submit-button" @click="editSave">완료</button>
    </div>
</template>

<script>
import UserDataService from "@/api/UserDataService";
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'Height',
    components: {
        GoBack,
    },
    data() {
        return {
            selectedHeight: null,
            selectedweight: null,
            heights: Array.from({ length: 150 }, (v, k) => k + 100),
            weights: Array.from({ length: 150 }, (v, k) => k + 1),
            goBackText: "",
            gender: "F",

        };
    },
    methods: {
        async editSave() {
            if (confirm("저장하시겠습니까?")) {
                try {
                    const data = {
                        gender: this.gender,
                    }
                    await UserDataService.editUserInfo(data);
                    alert("저장되었습니다");
                    this.$router.push("/home");
                } catch (error) {
                    console.log("수정실패", error);
                }
            }
        },
    }
};
</script>

<style scoped>
.page-title {
    width: 100%;
}

.submit-button {
    width: 100%;
    padding: 15px;
    margin-top: 40px;
    text-align: center;
    font-weight: var(--font-b-weight);
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-n-sec-size);
    color: #fff;
    background-color: var(--main-color);
}

.gender-img-wrap {
    display: flex;
    justify-self: center;
    justify-content: space-around;
}

.input-group {
    width: 100%;
}

.gender-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid var(--input-border-color);
    overflow: hidden;
    text-align: center;
}

.gender-img img {
    height: 100%;
}

.gender-box {
    margin-top: 10px;
    text-align: center;
}

.gender-text {
    margin: 20px 0;
    text-align: left;
    font-weight: var(--font-b-weight);
}

.gender-box input[type="radio"] {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    display: none;
}

.gender-box .custom-radio::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 17px;
    border: 2px solid var(--input-border-color);
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

.gender-box input[type="radio"]:checked+.custom-radio::before {
    border-color: var(--main-color);
    content: '';
    color: var(--main-color);
    accent-color: var(--main-color);
    text-align: center;
    font-size: var(--font-small-size);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b1a7"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 20.59 7.41 19.17 6l-10 10.17z"/></svg>');
}

.gender-box .custom-radio {
    font-size: var(--font-n-sec-size);
    color: var(--light-font-color);
}

.gender-box input[type="radio"]:checked+.custom-radio {
    color: var(--main-color);
    accent-color: var(--main-color);
}
</style>