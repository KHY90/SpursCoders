<template>
  <div class="container">
    <div class="total">
      <header class="navigation">
        <div class="first">
          <div class="logo">
            <img src="https://img.icons8.com/?size=100&id=pSoAxHFPLpWF&format=png&color=000000" alt="logo">
          </div>
          <div class="gps">
            <div>위치</div>
            <div>
              <img src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000" alt="gps">
            </div>
          </div>
        </div>
        <div class="second">
          <div>
            <img src="https://img.icons8.com/?size=100&id=63207&format=png&color=000000" alt="corectgps">
          </div>
          <div class="search">
            <input type="text" placeholder="위치를 입력하세요" v-model="keyword">
            <button class="button" @click="search">검 색</button>
          </div>
        </div>
      </header>

      <div class="totalbody">
        <!-- 지도를 표시할 div -->
        <div ref="map" class="map"></div>

        <!-- 마커 정보 리스트 -->
        <div class="placeinfo">
          <ul>
            <li v-for="(place, index) in places" :key="index">
              <strong>{{ place.place_name }}</strong>
              <p>{{ place.address_name }}</p>
              <p>{{ place.phone }}</p>
            </li>
          </ul>
        </div>
      </div>

      <footer>
        <nav class="bottom">
          <div class="bookmark">
            <a href="">즐겨찾기</a>
          </div>
          <div class="home">
            <RouterLink to="/main">홈</RouterLink>
          </div>
          <div class="logout">
            <RouterLink to="/">로그아웃</RouterLink>
          </div>
        </nav>
      </footer>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';

const keyword = ref('');
const places = ref([]);
let mapInstance;
const ps = ref(null);
const boundsChangedListener = ref(null);

onMounted(() => {
  loadKakaoMapScript();
});

const loadKakaoMapScript = () => {
  const script = document.createElement('script');
  script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0d81efa0ecfe59e238c0907b1af9c6d7&libraries=services';
  script.onload = () => {
    kakao.maps.load(() => {
      initializeKakaoMap();
    });
  };
  document.head.appendChild(script);
};

const initializeKakaoMap = () => {
  const options = {
    center: new kakao.maps.LatLng(37.5666805, 126.9784147),
    level: 5
  };
  const mapContainer = document.querySelector('.map');
  if (!mapContainer) return;

  mapInstance = new kakao.maps.Map(mapContainer, options);
  ps.value = new kakao.maps.services.Places(mapInstance);

  // 검색 및 마커 표시
  searchPlaces();

  // 지도 이벤트 리스너 등록
  boundsChangedListener.value = kakao.maps.event.addListener(mapInstance, 'bounds_changed', handleMapDragEnd);
}; 

const searchPlaces = () => {
  if (!ps.value) return;
  ps.value.categorySearch('FD6', placesSearchCB, { useMapBounds: true });
};

const placesSearchCB = (data, status) => {
  if (status === kakao.maps.services.Status.OK) {
    places.value = data;
    displayPlaces(data);
  } else {
    // 에러 처리
  }
};

const displayPlaces = (places) => {
  removeAllMarkers();
  places.forEach(place => {
    displayMarker(place);
  });
};

const displayMarker = (place) => {
  const marker = new kakao.maps.Marker({
    map: mapInstance,
    position: new kakao.maps.LatLng(place.y, place.x)
  });

  kakao.maps.event.addListener(marker, 'click', () => {
    displayPlaceInfo(place);
  });

  marker.setMap(mapInstance);
};

const handleMapDragEnd = () => {
  const bounds = mapInstance.getBounds();
  const swLatLng = bounds.getSouthWest(); 
  const neLatLng = bounds.getNorthEast();

  ps.value.categorySearch('FD6', (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else {
      // 에러 처리
    }
  }, {
    bounds: new kakao.maps.LatLngBounds(swLatLng, neLatLng)
  });
};

const displayPlaceInfo = (place) => {
  // 장소 상세 정보 표시
};

const removeAllMarkers = () => {
  markers.forEach(marker => {
    marker.setMap(null);
  });
  markers = [];
};

let markers = [];
</script>





<style scoped>
/* 스타일 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.total {
  border: 1px solid rgb(0, 0, 0);
  width: 80%;
  max-width: 500px;
  height: 100%;
  max-height: 100vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(255, 84, 84, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 헤더파트 */
.navigation {
  border: 1px solid rgb(255, 150, 150);
  background-color: #ff58e9;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.first,
.second {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.logo img,
.gps img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  display: flex;
}

.second img {
  width: 30px;
  height: 32px;
  object-fit: cover;
  display: flex;
}

.search {
  display: flex;
  align-items: center;
}

.search input {
  flex-grow: 1;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 3px 50px;
  height: 20px;
  width: 100%;
}

.search .button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 5px;
  cursor: pointer;
  width: 50%;
}

.search .button:hover {
  background-color: #e68900;
}

/* 바디 부분 */
.totalbody,
.totalbody * {
  margin: 0;
  padding: 0;
  font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
  font-size: 12px;
}

.totalbody {
  position: relative;
  width: 100%;
  height: 350px;
}

.map {
  width: 100%;
  height: 400px;
}

.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}

.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}

.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}

.placeinfo_wrap .after {
  content: '';
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}

.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}

.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}

.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}

.placeinfo .tel {
  color: #0f7833;
}

.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}

/* 풋터 부분 */
footer {
  border: 1px solid violet;
  height: 15%;
  background-color: rgb(249, 96, 211);
}

.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
