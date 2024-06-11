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
            <button class="button" @click="search">검색</button>
          </div>
        </div>
      </header>

      <div class="totalbody">
        <!-- 지도를 표시할 div -->
        <div ref="map" class="map"></div>

        <!-- 마커 정보 리스트 -->
        <div class="placeinfo">
          <ul>
            <div v-for="(place, index) in places" :key="index">
              <strong>{{ place.place_name }}</strong>
              <p>{{ place.address_name }}</p>
              <p>{{ place.phone }}</p>
            </div>
          </ul>
          <RouterLink>
            <span class="bookmark" @click="addToBookmarks(selectedPlace)">&#9733;</span>
          </RouterLink>
        </div>
      </div>

      <footer>
        <nav class="bottom">
          <div class="Bookmark">
                        <RouterLink to="/addtobookmarks">즐겨찾기</RouterLink>
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
import { ref, onMounted } from 'vue'; // Vue에서 ref와 onMounted 함수를 가져옵니다.

// 검색어를 저장할 변수
const keyword = ref('');
// 장소 목록을 저장할 변수
const places = ref([]);
// 지도 인스턴스를 저장할 변수
let mapInstance;
// 장소 검색 서비스를 저장할 변수
const ps = ref(null);
// 지도 경계 변경 이벤트 리스너를 저장할 변수
const boundsChangedListener = ref(null);

// 컴포넌트가 마운트되었을 때 실행될 함수
onMounted(() => {
  loadKakaoMapScript();
});

// 카카오 맵 스크립트를 로드하는 함수
const loadKakaoMapScript = () => {
  const script = document.createElement('script'); // 새로운 스크립트 태그 생성
  script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0d81efa0ecfe59e238c0907b1af9c6d7&libraries=services'; // 카카오 맵 스크립트 URL 설정
  script.onload = () => { // 스크립트가 로드되면 실행될 함수
    kakao.maps.load(() => { // 카카오 맵이 로드되면 실행될 함수
      initializeKakaoMap();
    });
  };
  document.head.appendChild(script); // 스크립트를 문서의 head에 추가
};

// 카카오 맵을 초기화하는 함수
const initializeKakaoMap = () => {
  const options = {
    center: new kakao.maps.LatLng(37.5666805, 126.9784147), // 초기 지도 중심 좌표
    level: 5 // 초기 지도 확대 레벨
  };
  const mapContainer = document.querySelector('.map'); // 지도를 표시할 div 요소 선택
  if (!mapContainer) return; // 만약 mapContainer가 없다면 함수 종료

  mapInstance = new kakao.maps.Map(mapContainer, options); // 새로운 지도 인스턴스 생성
  ps.value = new kakao.maps.services.Places(mapInstance); // 장소 검색 서비스 생성

  // 장소 검색 및 마커 표시
  searchPlaces();

  // 지도 경계 변경 이벤트 리스너 등록
  boundsChangedListener.value = kakao.maps.event.addListener(mapInstance, 'bounds_changed', handleMapDragEnd);
};

// 장소를 검색하는 함수
const searchPlaces = () => {
  if (!ps.value) return; // 장소 검색 서비스가 초기화되지 않았으면 함수 종료
  ps.value.categorySearch('FD6', placesSearchCB, { useMapBounds: true }); // 카테고리 코드 'FD6'을 사용해 장소 검색
};

// 장소 검색 콜백 함수
const placesSearchCB = (data, status) => {
  if (status === kakao.maps.services.Status.OK) { // 검색이 성공했을 때
    places.value = data; // 검색 결과를 places 변수에 저장
    displayPlaces(data); // 검색 결과를 지도에 표시
  } else {
    // 에러 처리
  }
};

// 장소를 지도에 표시하는 함수
const displayPlaces = (places) => {
  removeAllMarkers(); // 기존 마커 제거
  places.forEach(place => {
    displayMarker(place); // 각 장소에 마커 표시
  });
};

// 장소에 마커를 표시하는 함수
const displayMarker = (place) => {
  const marker = new kakao.maps.Marker({
    map: mapInstance, // 마커를 표시할 지도 인스턴스
    position: new kakao.maps.LatLng(place.y, place.x) // 마커의 위치 좌표
  });

  // 마커 클릭 시 장소 정보 표시
  kakao.maps.event.addListener(marker, 'click', () => {
    displayPlaceInfo(place); // 마커 클릭 시 장소 정보를 표시하는 함수 호출
  });

  marker.setMap(mapInstance); // 마커를 지도에 표시
};

// 지도 드래그 종료 시 실행될 함수
const handleMapDragEnd = () => {
  const bounds = mapInstance.getBounds(); // 현재 지도 경계를 가져옴
  const swLatLng = bounds.getSouthWest(); // 남서쪽 좌표
  const neLatLng = bounds.getNorthEast(); // 북동쪽 좌표

  ps.value.categorySearch('FD6', (data, status) => {
    if (status === kakao.maps.services.Status.OK) { // 검색이 성공했을 때
      displayPlaces(data); // 검색 결과를 지도에 표시
    } else {
      // 에러 처리
    }
  }, {
    bounds: new kakao.maps.LatLngBounds(swLatLng, neLatLng) // 현재 지도 경계를 기준으로 검색
  });
};

// 장소 정보를 표시하는 함수
const displayPlaceInfo = (place) => {
  const placeInfoElement = document.querySelector('.placeinfo ul'); // 장소 정보를 표시할 요소 선택

  // 장소명, 전화번호, 주소 등의 정보를 HTML로 설정
  placeInfoElement.innerHTML = `
    <li>
      <strong>${place.place_name}</strong>
      <p>${place.address_name}</p>
      <p>${place.phone}</p>
    </li>
  `;

  document.querySelector('.placeinfo').style.display = 'block'; // 장소 정보 요소를 보이도록 설정
};

// 모든 마커를 제거하는 함수
const removeAllMarkers = () => {
  markers.forEach(marker => {
    marker.setMap(null); // 마커를 지도에서 제거
  });
  markers = []; // 마커 배열 초기화
};

// 마커 배열
let markers = [];
</script>

<style scoped>
/* 전체 */
html,
body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'IBM Plex Sans KR', sans-serif;
}

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
  height: 100vh;
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
  width: 32px;
  height: 32px;
  object-fit: cover;
  display: flex;
}

.placeinfo {
  position: relative;
  /* 상대 위치 설정 */
}

/* 즐겨찾기 별 아이콘 스타일 */
.bookmark {
  position: absolute;
  /* 절대 위치 설정 */
  top: 0;
  /* 위쪽 여백 설정 */
  right: 0;
  /* 오른쪽 여백 설정 */
  font-size: 100px;
  /* 별 아이콘 크기 */
  color: gold;
  /* 별 아이콘 색상 */
  cursor: pointer;
  /* 마우스 커서를 포인터로 변경하여 클릭 가능한 상태로 표시 */
  transform: translate(50%, -50%);
  /* 위치 조정을 위한 변형 */
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
  width: 96%;
  display: none;
  /* 초기에는 숨김 처리 */
  z-index: 1000;
  /* 다른 요소 위에 표시되도록 설정 */
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
