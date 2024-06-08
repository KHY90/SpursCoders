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
                <div class="marker-list">
                    <ul>
                        <!-- 마커 정보는 이곳에 표시됩니다 -->
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
const map = ref(null);
const ps = ref(null);
const boundsChangedListener = ref(null); // boundsChanged 이벤트 리스너

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
    if (!mapContainer) return; // map 요소가 없으면 종료

    map.value = new kakao.maps.Map(mapContainer, options);
    ps.value = new kakao.maps.services.Places(map.value);

    // Kakao 지도 API 로드가 완료된 후에 검색을 진행
    search();

    // 지도 이벤트 리스너 등록
    boundsChangedListener.value = kakao.maps.event.addListener(map.value, 'bounds_changed', () => {
        // bounds가 변경될 때마다 검색을 다시 진행
        search();
    });
};

const search = () => {
    if (!ps.value) return; // ps가 초기화되지 않은 경우를 방지
    const bounds = map.value.getBounds(); // 현재 지도의 bounds 가져오기
    const swLatLng = bounds.getSouthWest(); // 남서쪽 좌표
    const neLatLng = bounds.getNorthEast(); // 북동쪽 좌표

    // 검색 영역 설정
    const searchBounds = new kakao.maps.LatLngBounds(swLatLng, neLatLng);

    // 검색 영역 내 음식점 검색
    ps.value.keywordSearch('음식점', placesSearchCB, {
        bounds: searchBounds
    });
};

const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
        places.value = data;
        displayPlaces();
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색 결과가 없음
    } else if (status === kakao.maps.services.Status.ERROR) {
        // 검색 중 오류 발생
    }
};

const displayPlaces = () => {
    removeAllMarkers(); // 모든 마커를 제거합니다.
    places.value.forEach(place => {
        const marker = new kakao.maps.Marker({
            map: map.value,
            position: new kakao.maps.LatLng(place.y, place.x)
        });
        kakao.maps.event.addListener(marker, 'click', () => {
            displayPlaceInfo(place);
        });
        markers.push(marker);
    });
};

const displayPlaceInfo = (place) => {
    console.log(place);
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
/* 생략 */
</style>


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
.totalbody {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 10px;
}

.map {
    width: 100%;
    height: 400px;
}

.marker-list {
    margin-top: 20px;
}

.marker-list ul {
    list-style: none;
    padding: 0;
}

.marker-list li {
    margin-bottom: 10px;
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
