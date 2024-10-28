<template>
  <div class="container margin-bottom-zero">
    <div class="find-container" v-if="findSearch">
      <header class="go-back-btn01">
        <div class="arrow" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
            <path d="M15 7L10 12L15 17" stroke="#111" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
        <div class="logo-img-box">
          {{ goBackText }}
        </div>
        <div style="width: 40px;"></div>
      </header>
      <div class="find-container-title">
        <h1>가까운 컨테이너 찾기</h1>
        <p>원하시는 위치를 선택해 가까운 컨테이너를 찾아보세요.</p>
      </div>
      <div class="city-select-wrap">
        <h4>지역 선택</h4>
        <div class="city-list-wrap">
          <div class="city-list-box" v-for="(city, index) in cityList" :key="index">
            <input type="radio" :id="city.code" name="city" :value="city.name" v-model="selectedCity">
            <label :for="city.code" class="custom-label" @click="getContainerList(city.code)">
              <small>
                {{ city.name }}
              </small>
            </label>
          </div>
        </div>
      </div>
      <div class="city-select-wrap">
        <h4>컨테이너 선택</h4>
        <div v-if="containterList.length > 0" class="city-list-wrap">
          <div class="city-list-box" v-for="(container, index) in containterList" :key="index">
            <input type="radio" :id="container.containerName" name="container" :value="container"
              v-model="selectedContainer">
            <label :for="container.containerName" class="custom-label">
              <small>
                {{ container.containerName }}
              </small>
            </label>
          </div>
        </div>
        <div v-else style="font-size: 14px;">해당 지역에는 컨테이너가 없습니다.</div>
      </div>
      <button type="submit" class="search-button" @click="searchContainer">조회하기</button>
    </div>
  </div>
  <header class="go-back-btn02">
    <div class="arrow" @click="searchGoBack">
      <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
        <path d="M15 7L10 12L15 17" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div class="logo-img-box">
      {{ goBackText }}
    </div>
    <div style="width: 40px;"></div>
  </header>
  <div id="map" style="width: 100%; height: 595px"></div>
  <div class="search-result">
    <div class="search-result-title">
      <p>G-CON 검색결과</p>
    </div>
    <div class="user-search-info">
      <span class="cate-city">{{ selectedCity }}</span>
      <span class="cate-arrow">></span>
      <span class="cate-city">{{ selectedContainer.containerName }}</span>
    </div>
    <div class="city-addr">
      <p>{{ selectedContainer.rdAdr }}</p>
    </div>
    <div class="city-tel">
      <p>TEL. {{ selectedContainer.telNo ? telFormat(selectedContainer.telNo) : '제공된 전화번호가 없습니다' }}</p>
    </div>
  </div>
</template>

<script>
import Map from '@/api/Map';
import GoBack from "@/components/GoBack.vue";

export default {
  name: 'findContainer',
  components: {
    GoBack,
  },
  data() {
    return {
      selectedCity: '',
      selectedContainer: '',
      map: null,
      markers: [],
      container: [],
      locations: [],
      goBackText: "컨테이너 찾기",
      findSearch: true,
      cityList: [],
      containterList: [],
    };
  },
  methods: {
    telFormat(num) {
      let formatNum;

      // 숫자만 추출
      num = num.replace(/\D/g, '');

      // 11자리 휴대폰 번호
      if (num.length === 11) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
      // 10자리 휴대폰 번호
      else if (num.length === 10) {
        // 서울 전화번호 (02로 시작하는 경우)
        if (num.startsWith('02')) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }
        // 서울 외 전화번호
        else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
      }
      // 8자리 업체 번호
      else if (num.length === 8) {
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
      }
      // 정의되지 않은 형식
      else {
        formatNum = num;
      }

      return formatNum;
    },
    goBack() {
      this.$router.go(-1);
    },
    searchGoBack() {
      this.findSearch = true;
    },
    async getCityList() {
      try {
        const response = await Map.getCityes();
        this.cityList = response.data;
      } catch (error) {
        console.log("도시 조회 실패", error);
      }
    },
    async getContainerList(code) {
      try {
        this.selectedContainer = '';
        const response = await Map.getContainer(code);
        this.containterList = response.data;
      } catch (error) {
        console.log("컨테이너 조회 실패", error);
      }
    },
    async searchContainer() {
      if (!this.selectedCity) {
        alert('지역을 선택해 주세요.');
        return;
      }

      if (!this.selectedContainer) {
        alert('컨테이너를 선택해 주세요.');
        return;
      }
      const { latitude, longitude, rdAdr } = this.selectedContainer;
      this.updateMap(latitude, longitude, rdAdr);
      this.findSearch = false;
    },
    updateMap(latitude, longitude, rdAdr) {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];

      const position = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(position);
      this.map.setZoom(15);

      const marker = new naver.maps.Marker({
        position: position,
        map: this.map,
        icon: {
          url: './img/app_logo_04.png',
          size: new naver.maps.Size(55, 53)
        }
      });
      const infowindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(rdAdr)}" style="color: rgb(0, 104, 195);">${rdAdr}</a></div>`,
        borderWidth: 0,
        disableAnchor: true,
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(this.map, marker);
        }
      });

      this.markers.push(marker);
    },
    async placeMarkers() {
      try {
        const response = await Map.containerInfo();
        this.locations = response.data;
        this.locations.forEach(location => {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(location.latitude, location.longitude),
            map: this.map,
            icon: {
              url: './img/app_logo_04.png',
              size: new naver.maps.Size(55, 53),
            }
          });
          const infowindow = new naver.maps.InfoWindow({
            content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(location.rdAdr)}" style="color: rgb(0, 104, 195);">${location.rdAdr}</a></div>`,
            borderWidth: 0,
            disableAnchor: true,
          });
          naver.maps.Event.addListener(marker, 'click', () => {
            if (infowindow.getMap()) {
              infowindow.close();
            } else {
              infowindow.open(this.map, marker);
            }
          });
          this.container.push(marker);
        });
      } catch (error) {
        console.log("컨테이너 위치 조회 실패", error);
      }
    },
  },
  async mounted() {
    this.map = new naver.maps.Map('map', this.placeMarkers());
    await this.placeMarkers();
    this.getCityList();
  }
};
</script>

<style scoped>
.container {
  padding: 0;
  overflow-y: hidden;
}

.find-container {
  top: 0;
  width: 100%;
  height: 105vh;
  background: #fff;
  z-index: 999;
  padding: 0 30px 30px;
}

#map {
  margin-top: -80px;
}

.go-back-btn01 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 0;
}

.go-back-btn02 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  background-color: #ffffff00;
  position: relative;
  z-index: 5;
}

.find-container-title h1 {
  font-size: var(--font-n-size);
  margin: 10px 0 5px;
}

.find-container-title p {
  font-size: var(--font-n-sec-size);
  word-break: keep-all;
}

.city-select-wrap {
  margin: 30px 0;
}

.city-select-wrap h4 {
  margin-bottom: 20px;
  color: var(--main-color);
}

.search-form {
  width: 100%;
}

.search-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--font-n-sec-size);
  color: #fff;
  background-color: var(--main-color);
  text-align: center;
  font-weight: var(--font-b-weight);
}

.g-con-list {
  width: 100%;
  margin-bottom: 100px;
}

.g-con-list h2 {
  margin: 20px 0 0;
}

.g-con-list li {
  border-bottom: 1px solid var(--input-border-color);
  height: 60px;
  line-height: 60px;
}

.g-con-list li:last-child {
  border-bottom: none;
}

.g-con-list a {
  display: block;
}

.location-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-list-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
}

.city-list-box {
  margin-bottom: 10px;
}

.city-select-wrap input[type="radio"] {
  display: none;
}

.city-select-wrap input[type="radio"]+.custom-label {
  border-radius: var(--border-radius);
  padding: 2px 10px;
  font-size: var(--font-n-sec-size);
  white-space: nowrap;
}

.city-select-wrap input[type="radio"]:checked+.custom-label {
  border: 2px solid var(--main-color);
  color: var(--main-color);
}

.search-result {
  position: absolute;
  bottom: 69px;
  width: 498px;
  background: #fff;
  padding: 30px 20px;
  font-size: var(--input-font-size);
  z-index: 500;
}

.search-result-title {
  margin-bottom: 25px;
  font-weight: var(--font-b-weight);
}

.cate-city {
  border: 2px solid var(--main-color);
  color: var(--main-color);
  padding: 2px 10px;
  border-radius: var(--border-radius);
}

.cate-arrow {
  color: var(--main-color);
  margin: 0 5px;
}

.user-search-info {
  margin-bottom: 15px;
}

.city-addr {
  margin-bottom: 5px;
}
</style>
