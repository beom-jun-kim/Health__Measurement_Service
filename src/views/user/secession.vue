<template>
    <div class="delete-account-container margin-bottom">
        <GoBack :goBackText="goBackText" />
        <div class="content">
            <p class="username"><span>{{ user.name }}</span> 님</p>
            <h3>회원탈퇴시 주의사항</h3>
            <div class="warnings">
                <p>· 더 이상 해당계정으로 G-Con App에 로그인할 수 없게 됩니다.</p>
                <p>· 저장하신 모든 측정정보/건강정보는 계정정보와 함께 삭제됩니다.</p>
                <p>· 삭제된 회원님의 측정정보/건강정보는 다시 복구가 불가합니다.</p>
                <p>· 회원가입시 제공하신 개인정보(이름, 성별, 핸드폰번호, 생년월일, 키, 체중)도 함께 삭제됩니다.</p>
                <p>· 동일한 명의로 G-Con에 재가입하기 위해서는 삭제일 기준 15일 이후 가능합니다.</p>
                <p>· 개인정보에 관한 문의사항은 1599-1000으로 문의바랍니다.</p>
            </div>
            <p class="confirmation-text"></p>
            <div class="buttons">
                <button class="delete-button" @click="deleteAccount">회원탈퇴</button>
                <button class="cancel-button" @click="cancel">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import UserDataService from "@/api/UserDataService";

export default {
    name: 'DeleteAccountView',
    components: {
        GoBack,
    },
    data() {
        return {
            user: {},
            goBackText: "회원탈퇴",
        }
    },
    methods: {
        async deleteAccount() {
            if (confirm("탈퇴를 진행하시겠습니까?")) {
                try {
                    await UserDataService.deleteUser();
                    alert('탈퇴가 완료되었습니다');
                    this.$router.push("/");
                } catch (error) {
                    console.log("회원 탈퇴 실패", error);
                }
            }
        },
        async getUserInfo() {
            try {
                const response = await UserDataService.getUserInfo();
                this.user = response.data;
            } catch (error) {
                console.log("유저정보조회 실패", error);
            }
        },
        cancel() {
            this.$router.push('/user/myInfo');
        }
    },
    async mounted() {
        await this.getUserInfo();
    }
};
</script>

<style scoped>
.delete-account-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.delete-account-container .warnings {
    border-top: 2px solid var(--input-border-color);
    border-bottom: 2px solid var(--input-border-color);
    padding: 20px;
}

.delete-account-container h3 {
    margin-bottom: 20px;
    font-size: var(--font-n-size);
    font-weight: var(--font-b-weight);
}

.delete-account-container .username {
    font-size: var(--font-n-size);
    margin-bottom: 20px;
}

.delete-account-container span {
    font-size: var(--font-b-size);
    font-weight: var(--font-b-weight);
}

delete-account-container .warnings {
    font-size: var(--font-n-sec-size);
    line-height: 1.5;
    color: #333;
    margin-bottom: 20px;
}

.warnings p {
    margin-bottom: 20px;
}

.confirmation-text {
    margin: 20px 0;
}

.buttons {
    display: flex;
    justify-content: center;
}

.buttons button {
    display: flex;
    justify-content: center;
    width: 50%;
    padding: 12px 0;
    border-radius: 5px;
    font-size: var(--input-font-size);
    color: #fff;
    border: none;
}

.delete-button {
    background-color: var(--main-color);
    margin-right: 5px;
}

.cancel-button {
    background-color: var(--light-font-color);
    margin-left: 5px;
}
</style>