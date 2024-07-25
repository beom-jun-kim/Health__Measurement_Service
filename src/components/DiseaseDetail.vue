<template>
    <div class="container">
        <header class="logo-header">
            <div class="arrow" @click="$emit('closeModalBtn')">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></span>
            </div>
            <div class="logo-img-box">
                <img src="../../public/img/app_logo_02.png" alt="logo header">
            </div>
            <div></div>
        </header>
        <div class="disease-detail">
            <h2>{{ currentGraph.disease }}</h2>
            <h3>{{ user.username }}님의 결과</h3>

            <div class="slider">
            <div class="slider-title">평균(이상없음)</div>
            <div class="slider-bar">
                <div class="filled-bar" :style="{'width': (currentGraph.avg / 5 * 100) + '%'}"></div>
                <input type="range" min="0" max="5" v-model="currentGraph.avg" disabled>
            </div>
            <div class="slider-values">
                <span :class="{ highlight: currentGraph.avg === 0 }">0</span>
                <span :class="{ highlight: currentGraph.avg === 1 }">1</span>
                <span :class="{ highlight: currentGraph.avg === 2 }">2</span>
                <span :class="{ highlight: currentGraph.avg === 3 }">3</span>
                <span :class="{ highlight: currentGraph.avg === 4 }">4</span>
                <span :class="{ highlight: currentGraph.avg === 5 }">5</span>
            </div>
            </div>

            <div class="slider">
            <div class="slider-title">나의 결과</div>
            <div class="slider-bar">
                <div class="filled-bar" :style="{'width': (currentGraph.myResult / 5 * 100) + '%'}"></div>
                <input type="range" min="0" max="5" v-model="currentGraph.myResult" disabled>
            </div>
            <div class="slider-values">
                <span :class="{ highlight: currentGraph.myResult === 0 }">0</span>
                <span :class="{ highlight: currentGraph.myResult === 1 }">1</span>
                <span :class="{ highlight: currentGraph.myResult === 2 }">2</span>
                <span :class="{ highlight: currentGraph.myResult === 3 }">3</span>
                <span :class="{ highlight: currentGraph.myResult === 4 }">4</span>
                <span :class="{ highlight: currentGraph.myResult === 5 }">5</span>
            </div>
            </div>

            <div class="message">
                <span>메세지</span>
                <p>
                    {{ user.username }}님의 결과는 {{ currentGraph.myResult }}단계로 나왔습니다. 평균 수치보다 높게 나와 {{ currentGraph.disease }} 가능성이 있습니다. 전문의와 상담받아 보시기 바랍니다.
                </p>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'DiseaseDetail',
    props: {
      paramAppId: {
        type: Number,
        required: true
      },
      graphList: {
        type: Array,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      currentGraph() {
        return this.graphList.find(graph => graph.id === this.paramAppId);
      },
    //   disease() {
    //     return this.currentGraph ? this.currentGraph.disease : '';
    //   },
    //   avg() {
    //     return this.currentGraph ? this.currentGraph.avg : 0;
    //   },
    //   myResult() {
    //     return this.currentGraph ? this.currentGraph.myResult : 0;
    //   }
    }
  };
  </script>
  
  <style scoped>
.disease-detail {
  padding: 0 10px;
}

.disease-detail h2 {
  margin-bottom: 10px;
  text-align: center;
}

.disease-detail h3 {
  font-size: var(--font-n-size);
  margin-bottom: 20px;
  text-align: center;
}

.disease-detail .slider {
  margin-bottom: 30px;
}

.disease-detail .slider-title {
  font-size: var(--font-n-size);
  margin-bottom: 10px;
  text-align: left;
}

.disease-detail .slider-bar {
  position: relative;
  margin-bottom: 10px;
  height: 15px;
  border-radius: 10px;
}

.disease-detail .slider-bar .filled-bar {
    height: 100%;
    background: var(--main-color);
    position: absolute;
    top: 2.5px;
    border-radius: 10px;
}

.disease-detail .slider-bar input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 15px;
  background: #e0e0e0;
  outline: none;
  border-radius: 10px;
}

.disease-detail .slider-bar input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 15px;
  background: #e0e0e0;
  border-radius: 10px;
}

.disease-detail .slider-bar input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: var(--main-color);
  border-radius: 50%;
  cursor: pointer;
  margin-top: -4px;
}

.disease-detail .slider-bar input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--main-color);
  border-radius: 50%;
  cursor: pointer;
}

.disease-detail .slider-bar input[type="range"]::-moz-range-track {
  width: 100%;
  height: 15px;
  background: #e0e0e0;
  border-radius: 10px;
}

.disease-detail .slider-bar input[type="range"]:disabled::-webkit-slider-thumb {
  background: var(--main-color);
}

.disease-detail .slider-bar input[type="range"]:disabled::-moz-range-thumb {
  background: var(--main-color);
}

.disease-detail .slider-bar input[type="range"]:disabled::-ms-thumb {
  background: var(--main-color);
}

.disease-detail .slider-bar input[type="range"]::-ms-track {
  width: 100%;
  height: 15px;
  background: transparent;
  border-color: transparent;
  border-width: 6px 0;
  color: transparent;
}

.disease-detail .slider-bar input[type="range"]::-ms-fill-lower {
  background: var(--main-color);
  border-radius: 10px;
}

.disease-detail .slider-bar input[type="range"]::-ms-fill-upper {
  background: #e0e0e0;
  border-radius: 10px;
}

.disease-detail .slider-values {
  display: flex;
  justify-content: space-between;
  /* margin-top: 5px; */
}

.disease-detail .slider-values span {
  font-size: var(--font-n-size);
  color: #757575;
  margin-top: 10px;
}

.disease-detail .slider-values .highlight {
  font-weight: bold;
  color: #000;
}

.disease-detail .message {
  border-top: 1px solid var(--input-border-color);
  padding-top: 30px;
}

.disease-detail .message p {
    border-radius: 10px;
    padding: 15px;
    border: 1px solid var(--main-color);
    margin-top: 20px;   
    word-break: keep-all;
}

</style>
  