<template>
    <div class="disease-container">
        <GoBack />
        <div class="walk-report-wrap">
            <h1 class="carousel__item--title" style="text-align: center;">보행동작 분석</h1>
            <div class="carousel__item">
                <div class="people-walk">
                    <img src="@/assets/img/people-walk.png" alt="보행동작분석">
                </div>
                <div class="desc">
                    <div class="desc-box">
                        <img src="@/assets/img/shoulder.png" alt="어깨">
                        <p>당신의 어깨각도 0/0도이며 평균보다 약간 좁습니다. </p>
                    </div>
                    <div class="desc-box">
                        <img src="@/assets/img/elbow.png" alt="팔꿈치">
                        <p>당신의 팔꿈치각도는 0/0도이며 평균보다 약간 넓습니다.</p>
                    </div>
                    <div class="desc-box">
                        <img src="@/assets/img/pelvis.png" alt="골반">
                        <p>당신의 골반각도는 0/0도이며 평균에 가깝습니다.</p>
                    </div>
                    <div class="desc-box">
                        <img src="@/assets/img/knee.png" alt="무릎">
                        <p>당신의 무릎각도 0/0도이며 평균에 가깝습니다. </p>
                    </div>
                    <div class="desc-box">
                        <img src="@/assets/img/ankle.png" alt="발목">
                        <p>당신의 발목각도는 0/0도이며 평균보다 약간 좁습니다.</p>
                    </div>
                </div>
            </div>
            <div class="level">
                <img src="@/assets/img/level_1.png" alt="">
            </div>
            <div class="ment-box">
                <p>간단한 설명을 적는 멘트 칸 입니다</p>
            </div>
        </div>
    </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";

export default {
    name: 'walkReport',
    components: {
        GoBack,
    },
    data() {
        return {
        }
    },
    methods: {
    }
};
</script>

<style scoped>
.disease-container {
    padding: 20px 10px;
}

.carousel__item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.carousel__item .desc-box {
    border: 1px solid var(--main-color);
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
}

.people-walk img {
    height: 366.77px;
}

.carousel__item .desc-box p {
    margin-left: 5px;
}

.level {
    margin-top: 25px;
}

.carousel__item--title {
    margin-bottom: 20px;
}

.ment-box {
    border: 1px solid var(--main-color);
    border-radius: 5px;
    padding: 8px 10px;
    margin: 10px 0 70px;
}
</style>