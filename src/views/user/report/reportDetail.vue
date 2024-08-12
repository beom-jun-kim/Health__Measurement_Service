<template>
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

/* .graph-wrap a {
  display: flex;
  justify-content: space-between;
  width: 100%;
} */

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
</style>
