<template>
  <div class="container">
    <GoBack :goBackText="goBackText" />
    <div class="report-sub-title">
      <p><span style="font-weight: var(--font-b-weight);">동작 걸음걸이</span><span class="report-sub-title-sepa">|</span>
        <span><strong>{{ reportDetail.userName }}</strong>님의 결과</span>
      </p>
      <small>측정일 : {{ reportDetail.createDate }}</small>
    </div>
    <div class="pattern">
      <div class="stance-phase">
        <div class="left-foot">
          <div class="left-foot-title">
            <span>왼발</span>
          </div>
          <div class="left-foot-info">
            <div class="left-foot-num">
              <span>입각기</span>
              <span>{{ reportDetail.stancephase1 }}</span>
            </div>
            <div class="left-foot-num">
              <span>유각기</span>
              <span>{{ reportDetail.swingphase1 }}</span>
            </div>
          </div>
        </div>
        <div class="left-foot">
          <div class="left-foot-title">
            <span>오른발</span>
          </div>
          <div class="left-foot-info">
            <div class="left-foot-num">
              <span>유각기</span>
              <span>{{ reportDetail.swingphase2 }}</span>
            </div>
            <div class="left-foot-num">
              <span>입각기</span>
              <span>{{ reportDetail.stancephase2 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel__item">
        <div class="people-walk-box">
          <div class="people-walk">
            <div class="foot-table-box">
              <img src="@/assets/img/foot-table.png" alt="보행패턴분석">
            </div>
            <span class="foot-data1">{{ reportDetail.stridelength4 }} cm</span>
            <span class="foot-data2">{{ reportDetail.steplength1 }} cm</span>
            <span class="foot-data3">{{ reportDetail.stepangle1 }} º</span>
            <span class="foot-data4">{{ reportDetail.stepangle2 }} º</span>
            <span class="foot-data5">{{ reportDetail.steplength2 }} cm</span>
          </div>
          <div class="people-walk">
            <div class="foot-table-box" style="width: 50%; margin: 0 auto;">
              <img src="@/assets/img/people.png" alt="보행패턴분석" style="transform: translateX(8px);">
            </div>
            <span class="people-data1">오른발<br>{{ reportDetail.stepforce1 }} %</span>
            <span class="people-data2">왼발<br>{{ reportDetail.stepforce2 }} %</span>
          </div>
        </div>
        <div class="level">
          <div class="level-img">
            <img src="@/assets/img/level_1.png" alt="등급 이미지">
          </div>
          <div class="coment">
            <p>코멘트</p>
          </div>
        </div>
        <div class="walk-table">
          <div class="walk-table-box walk-table-th">
            <span></span>
            <span>왼발</span>
            <span>오른발</span>
            <span style="color: var(--main-color);">표준범위</span>
          </div>
          <div class="walk-table-box">
            <span>보행길이 (cm)</span>
            <span>{{ reportDetail.steplength1 }}</span>
            <span>{{ reportDetail.steplength2 }}</span>
            <span>70-72</span>
          </div>
          <div class="walk-table-box">
            <span>보행 시간 (s)</span>
            <span>{{ reportDetail.singlesteptime1 }}</span>
            <span>{{ reportDetail.singlesteptime2 }}</span>
            <span>0.33~0.73</span>
          </div>
          <div class="walk-table-box">
            <span>보행 속도 (m/s)</span>
            <span>{{ reportDetail.stridetime1 }}</span>
            <span>{{ reportDetail.stridetime2 }}</span>
            <span>1.37</span>
          </div>
          <div class="walk-table-box">
            <span>보행 각도 (도)</span>
            <span>{{ reportDetail.stepangle1 }}</span>
            <span>{{ reportDetail.stepangle2 }}</span>
            <span>5~8</span>
          </div>
          <div class="walk-table-box">
            <span>보행 균형 (%)</span>
            <span>{{ reportDetail.stepforce1 }}</span>
            <span>{{ reportDetail.stepforce2 }}</span>
            <span>48~52</span>
          </div>
          <div class="walk-table-box">
            <span>보간 (cm)</span>
            <span>{{ reportDetail.baseofgait4 }}</span>
            <span>{{ reportDetail.baseofgait4 }}</span>
            <span>8~10</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import UserDataService from "@/api/U1serDataService";

export default {
  name: 'reportDetail',
  components: {
    GoBack,
  },
  data() {
    return {
      goBackText: "보행패턴 분석",
      reportDetail: {},
    }
  },
  methods: {
    async getUserReport(id) {
      try {
        const response = await UserDataService.userReport(id);
        this.reportDetail = response.data;
      } catch (e) {
        console.log("리포트 조회 실패", e);
      }
    }
  },
  async mounted() {
    await this.getUserReport(this.$route.params.id);
  }
};
</script>

<style scoped>
.container {
  padding: 20px 25px;
}

.report-sub-title {
  margin: -15px 0 25px;
  text-align: center;
}

.report-sub-title p {
  color: var(--main-color);
}

.report-sub-title p .report-sub-title-sepa {
  margin: 0 5px;
  color: var(--light-font-color);
}

.report-sub-title p span:last-child {
  color: #111;
}

.report-sub-title small {
  color: var(--light-font-color);
  font-weight: var(--font-t-weight);
}

.stance-phase {
  margin-bottom: 25px;
  padding: 0 8px;
}

.left-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.left-foot-title {
  color: var(--main-color);
  font-weight: var(--font-b-weight);
}

.left-foot-info {
  display: flex;
  width: 83%;
  background: #f2f2f2;
  border-radius: var(--border-radius);
  justify-content: space-evenly;
  padding: 3px 0;
}

.left-foot-num span:first-child {
  margin-right: 12px;
}

.pattern {
  font-size: var(--input-font-size);
}

.pattern-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.next-btn {
  color: var(--main-color);
}

.people-walk-box {
  display: flex;
  align-items: center;
}

.people-walk {
  flex: 1;
  position: relative;
  margin: 0 auto 15px;
  border-radius: 15px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}

.foot-data1,
.foot-data2,
.foot-data3,
.foot-data4,
.foot-data5,
.foot-data6,
.foot-data7,
.people-data1,
.people-data2 {
  position: absolute;
  font-size: 3.3333333333333335vw;
}

.foot-data1 {
  top: 11.5vw;
  left: 9vw;
}

.foot-data2 {
  top: 35vw;
  left: 14vw;
}

.foot-data3 {
  top: 47vw;
  left: 20vw;
}

.foot-data4 {
  top: 26vw;
  right: 14vw;
}

.foot-data5 {
  top: 11.5vw;
  right: 7.5vw;
}

.people-data1 {
  bottom: 11vw;
  left: 4vw;
  text-align: center;
}

.people-data2 {
  bottom: 11vw;
  right: 4vw;
  text-align: center;
}

.coment {
  border: 1px solid var(--input-border-color);
  padding: 10px;
  margin-bottom: 10px;
  color: var(--light-font-color);
}

.walk-table {
  background: #f2f2f2;
  padding: 15px;
  border-radius: var(--border-radius)
}

.walk-table-box {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c9c9c9;
}

.walk-table-box span {
  flex: 1;
  padding: 5px 0;
}

.walk-table-box span:first-child {
  flex: 2;
  padding-left: 5px;
  color: var(--main-color);
}

.walk-table-box span:last-child {
  flex: 1.5;
}

.walk-table-box span:nth-child(n+2) {
  text-align: center;
}

.walk-table-box:last-child {
  border: none;
}


.walk-table-th {
  background: #fff;
  border-radius: 50px;
  margin-bottom: 10px;
  border: none;
}
</style>



<!-- <template>
  <div class="container">
    <GoBack />
    <div class="aberrant-range">
      <span>이상범위</span>
      <div class="aberrant-range-box"></div>
    </div>
    <div class="total-title">
      <h2>질병 측정결과</h2>
    </div>
    <div class="graph">
      <div class="graph-wrap" v-for="(graph, index) in graphList" :Key=index>
        <div class="graph-title" @click="modalApp(graph.id)">
          <span>{{ graph.disease }}</span>
        </div>
        <div class="graph-box" @click="modalApp(graph.id)">
          <div class="content" :style="{ width: graph.percent + '%' }"></div>
        </div>
      </div>
    </div>
    <div class="walk-result">
      <div class="total-title">
        <h2>보행결과</h2>
      </div>
      <div class="graph-wrap graph-wrap-sec">
        <div class="graph-title">
          <span>{{ graphList[0].disease }}</span>
        </div>
        <div class="graph-box">
          <div class="content" :style="{ width: graphList[0].percent + '%' }"></div>
        </div>
      </div>
      <div class="walk-group">
        <div class="walk-result-box">
          <div class="walk-box" :class="{ 'active-tab': graphList[0].percent >= 71 && graphList[0].percent <= 100 }">
            정상보행
          </div>
          <div class="chk-box" :class="{ 'active-tab': graphList[0].percent >= 71 && graphList[0].percent <= 100 }">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"
              class="icon">
              <path d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10" stroke="#323232"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <div class="walk-result-box">
          <div class="walk-box" :class="{ 'active-tab': graphList[0].percent >= 41 && graphList[0].percent <= 70 }">
            의심보행
          </div>
          <div class="chk-box" :class="{ 'active-tab': graphList[0].percent >= 41 && graphList[0].percent <= 70 }">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"
              class="icon">
              <path d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10" stroke="#323232"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <div class="walk-result-box">
          <div class="walk-box" :class="{ 'active-tab': graphList[0].percent >= 0 && graphList[0].percent <= 40 }">
            이상보행
          </div>
          <div class="chk-box" :class="{ 'activ e-tab': graphList[0].percent >= 0 && graphList[0].percent <= 40 }">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"
              class="icon">
              <path d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10" stroke="#323232"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div class="total-result">
        <div class="total-title">
          <h2>종합의견</h2>
        </div>
        <div class="total-content">
          <p>{{ user.username }}님은 뇌졸중과 치매, 파킨슨에 대한 범위는 정상범위 안으로 나타났지만 퇴행성 관절염에 관한...</p>
        </div>
      </div>
    </div>    
    <Transition name="slide-fade">
      <div class="diseaseModal" v-if="diseaseModal">
        <DiseaseDetail @closeModalBtn="closeModalBtn" :paramAppId="appId" :graphList="graphList" :user="user"/>
      </div>
    </Transition>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import DiseaseDetail from "@/components/DiseaseDetail.vue";

export default {
  name: 'reportDetail',
  components: {
    GoBack,
    DiseaseDetail,
  },
  data() {
    return {
      diseaseModal: false,
      graphList: [
        {
          id: 1,
          disease: "정상보행",
          percent: 72,
          avg: 3,
          myResult: 4,
        },
        {
          id: 2,
          disease: "뇌졸중",
          percent: 90,
          avg: 0,
          myResult: 2,
        },
        {
          id: 3,
          disease: "파킨슨",
          percent: 60,
          avg: 4,
          myResult: 5,
        },
        {
          id: 4,
          disease: "퇴행성",
          percent: 70,
          avg: 1,
          myResult: 3,
        },
        {
          id: 5,
          disease: "치매",
          percent: 92,
          avg: 2,
          myResult: 1,
        },
      ],
      user: {
        id: 1,
        username: "김범준",
      }

    }
  },
  methods: {
    modalApp(appId) {
      this.appId = appId;
      this.diseaseModal = true;
    },
    closeModalBtn() {
      this.diseaseModal = false;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px 25px;
}

.total-title {
  width: 100%;
}

.graph {
  width: 100%;
  padding-bottom: 30px;
}

.walk-result {
  border-top: 2px solid var(--input-border-color);
  width: 100%;
  padding-top: 30px;
}

.aberrant-range {
  position: absolute;
  right: 20px;
  top: 100px;
}

.aberrant-range span {
  color: #FF0000;
  font-weight: var(--font-b-weight);
}

.aberrant-range-box {
  width: 60px;
  height: 300px;
  background: #f4000034;
  margin-top: 10px;
}

.graph-title {
  white-space: nowrap;
  font-weight: var(--font-b-weight);
  color: var(--main-color);
}

.graph-wrap:first-child {
  display: none;
}

.graph-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.graph-box {
  width: 80%;
  height: 15px;
  background: var(--input-border-color);
  border-radius: 10px;
}

.graph-box .content {
  width: 80%;
  background: var(--main-color);
  height: 100%;
  border-radius: 10px;
}

.walk-group {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.walk-group .walk-box {
  border-radius: 5px;
  padding: 10px 20px;
  border: 2px solid var(--main-color);
  font-weight: var(--font-b-weight);
}

.walk-group .walk-box.active-tab {
  background: var(--main-color);
  color: #fff;
}

.walk-group .chk-box {
  width: 25px;
  height: 25px;
  border: 1px solid var(--input-border-color);
  margin: 10px auto;
  border-radius: 50%;
  position: relative;
}

.walk-group .chk-box.active-tab {
  background: var(--main-color);
  border: 1px solid var(--main-color);
}

.walk-group .chk-box .icon path {
  stroke: #ccc;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.walk-group .chk-box.active-tab .icon path {
  stroke: #fff;
}

.walk-group .chk-box .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.total-content {
  border: 1px solid var(--main-color);
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  word-break: keep-all;
}

.diseaseModal {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  transition: 300ms;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
</style> -->








<!-- <template>
  <div class="report-detail-container">
    <GoBack />
    <Carousel :wrap-around="true">
      <Slide key=index01 style="margin-top: 50px;">
        <h1 class="carousel__item--title">보행동작 분석</h1>
        <div class="carousel__item">
          <div class="people-walk">
            <img src="@/assets/img/people-walk.png" alt="보행동작분석">
          </div>
          <div class="desc">
            <div class="desc-box">
              <img src="" alt="">
              <p>회원님의 어깨각도는 0/0도이며 평균보다 약간 좁습니다. 생활습관에서 어느 부분을 사용할 때 유의해주세요</p>
            </div>
            <div class="desc-box">
              <img src="" alt="">
              <p>당신의 팔꿈치 각도는 0/0도이며 평균보다 약간 넓습니다. 생활습관에서 어느 부분을 사용할 때 유의해주세요</p>
            </div>
            <div class="desc-box">
              <img src="" alt="">
              <p>당신의 골반각도는 0/0도이며 평균에 가깝습니다. 생활습관에서 어느 부분을 사용할 때 유의해주세요</p>
            </div>
            <div class="desc-box">
              <img src="" alt="">
              <p>당신의 무릎각도 0/0도이며 평균에 가깝습니다. 생활습관에서 어느 부분을 사용할 때 유의해주세요</p>
            </div>
            <div class="desc-box">
              <img src="" alt="">
              <p>당신의 발목각도는 0/0도이며 평균보다 약간 좁습니다. 생활습관에서 어느 부분을 사용할 때 유의해주세요</p>
            </div>
          </div>
          <div class="level">
            <img src="@/assets/img/level_1.png" alt="">
          </div>
        </div>
      </Slide>
      <Slide key=index02 style="margin-top: 50px; height: 800px;">
        <h1 class="carousel__item--title">보행패턴 분석</h1>
        <div class="carousel__item">
          <div class="people-walk-box">
            <div class="people-walk" style="background: #f4f4f4; border-radius: 15px; position: relative;">
              <div class="foot-table-box">
                <img src="@/assets/img/foot-table.png" alt="보행패턴분석">
              </div>
              <span class="foot-data1">102cm</span>
              <span class="foot-data2">54cm</span>
              <span class="foot-data3">10º</span>
              <span class="foot-data4">10º</span>
              <span class="foot-data5">48cm</span>
              <span class="foot-data6">2.0</span>
              <span class="foot-data7">1.0</span>
            </div>
            <div class="people-walk" style="position: relative;">
              <div class="foot-table-box">
                <img src="@/assets/img/people.png" alt="보행패턴분석">
              </div>
              <span class="people-data1">54%</span>
              <span class="people-data2">48%</span>
            </div>
          </div>
          <table class="walk-table" border="1">
            <thead>
              <tr>
                <th colspan="2"></th>
                <th>LEET</th>
                <th>RIGHT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">Step Length</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">Step Angle</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">Step Force</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">Stance phase</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">Swing phase</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">Step Length</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">Step Length</td>
                <td>000</td>
                <td>000</td>
              </tr>
              <tr>
                <td colspan="2">COP Length</td>
                <td>000</td>
                <td>000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>

    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import { Carousel, Slide } from "vue3-carousel";
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import "vue3-carousel/dist/carousel.css";
import GoBack from "@/components/GoBack.vue"

export default defineComponent({
  name: "reportDetail",
  components: {
    Carousel,
    Slide,
    GoBack,
    // Pagination,
    Navigation,
  },
  data() {
    return {
    };
  },
});
</script>

<style scoped>
.report-detail-container {
  padding: 20px;
  /* margin-bottom: 24px; */
}

.carousel {
  position: relative;
  /* margin-top: 50px; */
}

.carousel__item {
  position: relative;
}

.carousel__item--title {
  position: absolute;
  top: -55px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

:deep(.carousel__viewport) {
  overflow-y: visible;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  box-sizing: content-box;
  position: fixed;
  /* top: -3%; */
  font-size: 0;
  border: 3px solid;
  background: #fff;
  width: 35px;
  height: 35px;
}

:deep(.carousel__prev) {
  left: 5%;
}

:deep(.carousel__next) {
  right: 5%;
}

:deep(.carousel__prev):before {
  content: '\f104';
  font-size: 30px;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateY(2px);
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}

:deep(.carousel__next):before {
  content: '\f105';
  font-size: 30px;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  width: 100%;
  height: 100%;
  transform: translateY(2px);
  position: absolute;
}

.people-walk {
  margin: 0 auto 20px;
}

.desc-box {
  display: flex;
  border: 2px solid var(--main-color);
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
}

.level {
  margin: 30px 0 44px;
}

.people-walk-box {
  display: flex;
  gap: 5px;
}

.walk-table tr {
  border-style: dotted;
}

.foot-data1,
.foot-data2,
.foot-data3,
.foot-data4,
.foot-data5,
.foot-data6,
.foot-data7,
.people-data1,
.people-data2 {
  position: absolute;
  font-size: 3.3333333333333335vw;
}

.foot-data1 {
  top: 23.61111111111111vw;
  left: 11.11111111111111vw;
}

.foot-data2 {
  top: 33.88888888888889vw;
  left: 11.11111111111111vw;
}

.foot-data3 {
  top: 47.22222222222222vw;
  left: 16.666666666666664vw;
}

.foot-data4 {
  top: 27.77777777777778vw;
  right: 11.11111111111111vw;
}

.foot-data5 {
  top: 40.27777777777778vw;
  right: 5.555555555555555vw;
}

.foot-data6 {
  bottom: 2.7777777777777777vw;
  left: 5.555555555555555vw;
}

.foot-data7 {
  bottom: 2.7777777777777777vw;
  right: 5.555555555555555vw;
}

.people-data1 {
  bottom: 11.11111111111111vw;
  left: 4.166666666666666vw;
}

.people-data2 {
  bottom: 11.11111111111111vw;
  right: 4.166666666666666vw;
}
</style> -->