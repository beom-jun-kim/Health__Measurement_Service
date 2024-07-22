<template>
  <div class="container">
    <header>
      <h1>가까운 컨테이너 찾기</h1>
      <p>검색하시고자 하는 지역을 선택해주세요</p>
    </header>
    <form class="search-form" @submit.prevent="searchAddress">
      <div class="input-group">
        <select v-model="selectedCity" @change="updateDistricts">
          <option disabled value="">시/군/구 선택</option>
          <option v-for="city in cities" :key="city">{{ city }}</option>
        </select>
      </div>
      <div class="input-group">
        <select v-model="selectedDistrict" @change="updateNeighborhoods">
          <option disabled value="">지역구 선택</option>
          <option v-for="district in districts" :key="district">{{ district }}</option>
        </select>
      </div>
      <div class="input-group">
        <select v-model="selectedNeighborhood">
          <option disabled value="">동/면/읍 선택</option>
          <option v-for="neighborhood in neighborhoods" :key="neighborhood">{{ neighborhood }}</option>
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
                {{ location.address.length > 18 ? `${location.address.slice(0, 18)}...` : location.address }}
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
import axios from 'axios';

export default {
  name: 'FindContainerView',
  data() {
    return {
      selectedCity: '',
      selectedDistrict: '',
      selectedNeighborhood: '',
      cities: [],
      districts: [],
      neighborhoods: [],
      address: "",
      map: null,
      markers: [],
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
    async getGeocode() {
      // this.address = `${this.selectedCity} ${this.selectedDistrict} ${this.selectedNeighborhood}`;
      this.address = "부산광역시 수영구 광서로16번길 33";
      const client_id = 'anlunuki13';
      const client_secret = 'at2t14up0S0XAnxQNWmgu04sIgWZ6ZVvMXYxPnv4';
      const url = '/map-geocode/v2/geocode';
      const headers = {
        'X-NCP-APIGW-API-KEY-ID': client_id,
        'X-NCP-APIGW-API-KEY': client_secret,
        "Accept": "application/json",
      };
      const params = {
        query: this.address,
      };
      try {
        const response = await axios.get(url, { headers, params });
        console.log("1234", response.data);
        const result = response.data.addresses[0];
        const lng = result.x;
        const lat = result.y;
        this.updateMap(lat, lng);
        this.sortLocationsByDistance(lat, lng);
      } catch (error) {
        console.error('Error fetching geocode data:', error);
      }
    },
    updateMap(latitude, longitude) {
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
            url: '../../../public/img/app_logo_04.png',
            size: new naver.maps.Size(50, 13),
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
        this.markers.push(marker);
      });
    },
    sortLocationsByDistance(lat, lng) {
      const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // km
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
