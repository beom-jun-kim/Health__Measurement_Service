import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)


// 네이버 맵 스크립트 동적으로 추가
const naverMapScript = document.createElement('script')
naverMapScript.type = 'text/javascript'
naverMapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_APP_API_CLIENT_ID}&submodules=geocoder`
document.head.appendChild(naverMapScript)

app.mount('#app')
