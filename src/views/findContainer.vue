<template>
    <div class="container">
      <header>
        <h1>가까운 컨테이너 찾기</h1>
        <p>검색하시고자 하는 지역을 선택해주세요</p>
      </header>
      <form class="search-form">
        <div class="input-group">
          <select v-model="selectedCity">
            <option disabled value="">시/군/구 선택</option>
            <option>부산시</option>
            <option>서울시</option>
            <option>대구시</option>
          </select>
        </div>
        <div class="input-group">
          <select v-model="selectedDistrict">
            <option disabled value="">지역구 선택</option>
          </select>
        </div>
        <div class="input-group">
          <select v-model="selectedNeighborhood">
            <option disabled value="">동/면/읍 선택</option>
          </select>
        </div>
        <button type="submit" class="search-button">검색하기</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FindContainerView',
    data() {
      return {
        selectedCity: '',
        selectedDistrict: '',
        selectedNeighborhood: '',
        // 시/군/구 및 동/면/읍 데이터 추가 필요
      };
    },
    methods: {
      // 시/군/구 및 동/면/읍 데이터 로드 및 처리 메소드 추가 필요
    }
  };
  </script>
  
  <style scoped>
  header {
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: var(--font-b-size);
    color: var(--main-color);
    font-weight: var(--font-b-weight);
    margin: 10px 0;
  }
  
  p {
    font-size: var(--font-n-size);
  }
  
  .search-form {
    width: 100%;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    appearance: none;
  }
  
  .search-button {
    width: 100%;
    padding: 17px;
    border: none;
    border-radius: 5px;
    font-size: var(--font-n-size);
    color: #fff;
    background-color: var(--main-color);
    text-align: center;
    font-weight: var(--font-b-weight);
  }
  </style>
  