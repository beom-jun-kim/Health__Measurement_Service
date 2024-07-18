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
  </div>
  <!-- <div>
    <input v-model="address" placeholder="Enter address" />
    <button @click="getGeocode">Search</button>
    <div v-if="result">
      <p>Latitude: {{ result.addresses[0].y }}</p>
      <p>Longitude: {{ result.addresses[0].x }}</p>
      <p>Address: {{ result.addresses[0].roadAddress }}</p>
    </div>
  </div> -->
  <div id="map" style="width: 100%; height: 400px"></div>
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
    };
  },
  methods: {
    async fetchCities() {
      const url = 'YOUR_API_ENDPOINT_FOR_CITIES';
      try {
        const response = await axios.get(url);
        this.cities = response.data.cities;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    // async updateDistricts() {
    //   if (this.selectedCity) {
    //     const url = `YOUR_API_ENDPOINT_FOR_DISTRICTS?city=${this.selectedCity}`;
    //     try {
    //       const response = await axios.get(url);
    //       this.districts = response.data.districts;
    //     } catch (error) {
    //       console.error('Error fetching districts:', error);
    //     }
    //   }
    //   this.selectedDistrict = '';
    //   this.selectedNeighborhood = '';
    //   this.neighborhoods = [];
    // },
    // async updateNeighborhoods() {
    //   if (this.selectedDistrict) {
    //     const url = `YOUR_API_ENDPOINT_FOR_NEIGHBORHOODS?city=${this.selectedCity}&district=${this.selectedDistrict}`;
    //     try {
    //       const response = await axios.get(url);
    //       this.neighborhoods = response.data.neighborhoods;
    //     } catch (error) {
    //       console.error('Error fetching neighborhoods:', error);
    //     }
    //   }
    //   this.selectedNeighborhood = '';
    // },
    async getCities() {
      try {
        const apiKey = '082236BE-5A59-35FC-BF24-5425A3B16BD2';
        const response = await axios.get('/api/req/data', {
          params: {
            service: 'data',
            request: 'GetFeature',
            data: 'LT_C_ADSIGG_INFO',
            key: apiKey,
            domain: 'localhost',
            format: 'json',
            geomFilter: `point(127.105399 37.3595704)`
          },
        });
        console.log("response",response);
        const features = response.data.response.result.featureCollection.features;
        this.cities = [...new Set(features.map(feature => feature.properties.sido_nm))];
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    async getGeocode() {
      this.address = `${this.selectedCity} ${this.selectedDistrict} ${this.selectedNeighborhood}`;
      const client_id = 'anlunuki13';
      const client_secret = 'at2t14up0S0XAnxQNWmgu04sIgWZ6ZVvMXYxPnv4';
      const url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';
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
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching geocode data:', error);
      }
    },
  },
  mounted() {
    var mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };
    var map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });
    this.fetchCities();
    this.getCities();
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