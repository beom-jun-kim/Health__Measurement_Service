<template>
  <div class="container">
    <header>
      <h1>가까운 컨테이너 찾기</h1>
      <p>검색하시고자 하는 지역을 선택해주세요</p>
    </header>
    <form class="search-form" @submit.prevent="searchAddress">
      <div class="input-group">
        <select v-model="selectedCity" @change="updateDistricts">
          <option disabled value="">시/도 선택</option>
          <option v-for="city in cities" :key="city">{{ city }}</option>
        </select>
      </div>
      <div class="input-group">
        <select v-model="selectedDistrict">
          <option disabled value="">지역구 선택</option>
          <option v-for="district in districts" :key="district">{{ district }}</option>
        </select>
      </div>
      <button type="submit" class="search-button" @click="getGeocode">검색하기</button>
    </form>
    <div id="map" style="width: 100%; height: 400px"></div>
    <div class="g-con-list" v-if="sortedLocations.length > 0">
      <h2>가장 가까운 거리순</h2>
      <ul>
        <li v-for="(location, index) in sortedLocations" :key="index">
          <a :href="`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`">
            <div class="location-text">
              <span>
                {{ location.address.length > 17 ? `${location.address.slice(0, 17)}...` : location.address }}
              </span>
              <span>
                {{ formatDistance(location.distance) }} km
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Map from '@/api/Map';

export default {
  name: 'findContainer',
  data() {
    return {
      selectedCity: '',
      selectedDistrict: '',
      cities: [
        // "시/도 선택",
        "서울특별시",
        "인천광역시",
        "대전광역시",
        "광주광역시",
        "대구광역시",
        "울산광역시",
        "부산광역시",
        "경기도",
        "강원도",
        "충청북도",
        "충청남도",
        "전라북도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주도",
      ],
      districts: [],
      address: "",
      map: null,
      markers: [],
      container: [],
      locations: [
        { lat: 35.876083, lng: 128.596031, address: '대구 광역시 중구 동성로 2가 1' },
        { lat: 37.458666, lng: 126.4419679, address: '인천광역시 서구 경서동 120-1' },
        { lat: 35.1728688, lng: 128.9471783, address: '경상남도 창원시 마산합포구 창포동2가 30-1' },
        { lat: 35.1689218, lng: 129.1296311, address: '부산광역시 해운대구 중동 1392-102' },
      ],
      sortedLocations: [],
    };
  },
  methods: {
    updateDistricts() {
      const area0 = [
        "시/도 선택",
        "서울특별시",
        "인천광역시",
        "대전광역시",
        "광주광역시",
        "대구광역시",
        "울산광역시",
        "부산광역시",
        "경기도",
        "강원도",
        "충청북도",
        "충청남도",
        "전라북도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주도",
      ];
      const area1 = [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ];
      const area2 = [
        "계양구",
        "남구",
        "남동구",
        "동구",
        "부평구",
        "서구",
        "연수구",
        "중구",
        "강화군",
        "옹진군",
      ];
      const area3 = ["대덕구", "동구", "서구", "유성구", "중구"];
      const area4 = ["광산구", "남구", "동구", "북구", "서구"];
      const area5 = [
        "남구",
        "달서구",
        "동구",
        "북구",
        "서구",
        "수성구",
        "중구",
        "달성군",
      ];
      const area6 = ["남구", "동구", "북구", "중구", "울주군"];
      const area7 = [
        "강서구",
        "금정구",
        "남구",
        "동구",
        "동래구",
        "부산진구",
        "북구",
        "사상구",
        "사하구",
        "서구",
        "수영구",
        "연제구",
        "영도구",
        "중구",
        "해운대구",
        "기장군",
      ];
      const area8 = [
        "고양시",
        "과천시",
        "광명시",
        "광주시",
        "구리시",
        "군포시",
        "김포시",
        "남양주시",
        "동두천시",
        "부천시",
        "성남시",
        "수원시",
        "시흥시",
        "안산시",
        "안성시",
        "안양시",
        "양주시",
        "오산시",
        "용인시",
        "의왕시",
        "의정부시",
        "이천시",
        "파주시",
        "평택시",
        "포천시",
        "하남시",
        "화성시",
        "가평군",
        "양평군",
        "여주군",
        "연천군",
      ];
      const area9 = [
        "강릉시",
        "동해시",
        "삼척시",
        "속초시",
        "원주시",
        "춘천시",
        "태백시",
        "고성군",
        "양구군",
        "양양군",
        "영월군",
        "인제군",
        "정선군",
        "철원군",
        "평창군",
        "홍천군",
        "화천군",
        "횡성군",
      ];
      const area10 = [
        "제천시",
        "청주시",
        "충주시",
        "괴산군",
        "단양군",
        "보은군",
        "영동군",
        "옥천군",
        "음성군",
        "증평군",
        "진천군",
        "청원군",
      ];
      const area11 = [
        "계룡시",
        "공주시",
        "논산시",
        "보령시",
        "서산시",
        "아산시",
        "천안시",
        "금산군",
        "당진군",
        "부여군",
        "서천군",
        "연기군",
        "예산군",
        "청양군",
        "태안군",
        "홍성군",
      ];
      const area12 = [
        "군산시",
        "김제시",
        "남원시",
        "익산시",
        "전주시",
        "정읍시",
        "고창군",
        "무주군",
        "부안군",
        "순창군",
        "완주군",
        "임실군",
        "장수군",
        "진안군",
      ];
      const area13 = [
        "광양시",
        "나주시",
        "목포시",
        "순천시",
        "여수시",
        "강진군",
        "고흥군",
        "곡성군",
        "구례군",
        "담양군",
        "무안군",
        "보성군",
        "신안군",
        "영광군",
        "영암군",
        "완도군",
        "장성군",
        "장흥군",
        "진도군",
        "함평군",
        "해남군",
        "화순군",
      ];
      const area14 = [
        "경산시",
        "경주시",
        "구미시",
        "김천시",
        "문경시",
        "상주시",
        "안동시",
        "영주시",
        "영천시",
        "포항시",
        "고령군",
        "군위군",
        "봉화군",
        "성주군",
        "영덕군",
        "영양군",
        "예천군",
        "울릉군",
        "울진군",
        "의성군",
        "청도군",
        "청송군",
        "칠곡군",
      ];
      const area15 = [
        "거제시",
        "김해시",
        "마산시",
        "밀양시",
        "사천시",
        "양산시",
        "진주시",
        "진해시",
        "창원시",
        "통영시",
        "거창군",
        "고성군",
        "남해군",
        "산청군",
        "의령군",
        "창녕군",
        "하동군",
        "함안군",
        "함양군",
        "합천군",
      ];
      const area16 = ["서귀포시", "제주시", "남제주군", "북제주군"];

      const areaMap = {
        "서울특별시": area1,
        "인천광역시": area2,
        "대전광역시": area3,
        "광주광역시": area4,
        "대구광역시": area5,
        "울산광역시": area6,
        "부산광역시": area7,
        "경기도": area8,
        "강원도": area9,
        "충청북도": area10,
        "충청남도": area11,
        "전라북도": area12,
        "전라남도": area13,
        "경상북도": area14,
        "경상남도": area15,
        "제주도": area16,
      };

      this.districts = areaMap[this.selectedCity] || [];
    },
    async getGeocode() {
      this.address = `${this.selectedCity} ${this.selectedDistrict}`;
      try {
        const response = await Map.searchAddr(this.address);
        const lng = response.data.longitude;
        const lat = response.data.latitude;
        this.updateMap(lat, lng);
        this.sortLocationsByDistance(lat, lng);
      } catch (error) {
        console.error('Error fetching geocode data:', error);
      }
    },
    updateMap(latitude, longitude) {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
      
      const position = new naver.maps.LatLng(latitude, longitude);
      this.map.setCenter(position);
      this.map.setZoom(15);

      const marker = new naver.maps.Marker({
        position: position,
        map: this.map
      });
      this.markers.push(marker);
    },
    placeMarkers() {
      this.locations.forEach(location => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(location.lat, location.lng),
          map: this.map,
          icon: {
            url: './img/app_logo_04.png',
            size: new naver.maps.Size(55, 53),
          }
        });
        const infowindow = new naver.maps.InfoWindow({
          content: `<div style="padding:10px;"><a href="https://map.naver.com/v5/search/${encodeURIComponent(location.address)}" style="color: rgb(0, 104, 195);">${location.address}</a></div>`,
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
    },
    sortLocationsByDistance(lat, lng) {
      const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      this.sortedLocations = this.locations.map(location => {
        return {
          ...location,
          distance: calculateDistance(lat, lng, location.lat, location.lng)
        };
      }).sort((a, b) => a.distance - b.distance);
    },
    formatDistance(distance) {
      const formattedDistance = distance.toFixed(2);
      return parseFloat(formattedDistance) % 1 === 0 ? parseInt(formattedDistance) : formattedDistance;
    }
  },
  mounted() {
    this.map = new naver.maps.Map('map', this.placeMarkers());
    this.placeMarkers();
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

#map {
  margin-top: 50px;
}

.g-con-list {
  width: 100%;
  margin-bottom: 100px;
}

.g-con-list h2 {
  margin: 20px 0 0;
  /* padding-left: 15px; */
}

.g-con-list li {
  border-bottom: 1px solid var(--input-border-color);
  height: 68px;
  line-height: 68px;
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
</style>
