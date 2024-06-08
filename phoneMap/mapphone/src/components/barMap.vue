<template>
    <div class="container"> <!-- 전체 컴포넌트를 감싸는 최상위 div -->
        <div class="total"> <!-- 전체 레이아웃을 감싸는 div -->
            <header class="navigation"> <!-- 상단 네비게이션 바 -->
                <div class="first"> <!-- 로고와 위치 아이콘을 포함 -->
                    <div class="logo"> <!-- 로고 이미지를 감싸는 div -->
                        <img src="https://img.icons8.com/?size=100&id=pSoAxHFPLpWF&format=png&color=000000" alt="logo">
                    </div>
                    <div class="gps"> <!--위치 텍스트와 아이콘을 감싸는 div-->
                        <div>위치</div> <!--위치 텍스트-->
                        <div>
                            <img src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000" alt="gps">
                        </div>
                    </div>
                </div>
                <div class="second"> <!-- gps 수정 아이콘과 검색 바를 포함 -->
                    <div> <!--GPS 수정 아이콘을 감싸는 div-->
                        <img src="https://img.icons8.com/?size=100&id=63207&format=png&color=000000" alt="corectgps">
                    </div>
                    <div class="serch"> <!--검색 바를 감싸는 div-->
                        <input type="text" placeholder="위치를 입력하세요">
                        <button class="button">검 색</button>
                    </div>
                </div>
            </header>

            <!-- 지도 부분 -->
            <div class="totalbody"> <!--지도  표시를 위한 영역-->
                <div id="map" class="map"></div>
            </div>

            <!-- 풋터 -->
            <footer> <!--하단 네비게이션 바-->
                <nav class="botom">
                    <div class="Bookmark">
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

<script>
export default { 
    name: 'MapComponent', //component의 이름 정의. 
                          //이component는 MapComponent라는 이름을 갖습니다.
    data() {
        return {}; // Vue component 의 데이터를 초기화 합니다.
                   // 여기서는 데이터를 초기화 합니다.
    },
    mounted() {
        // Vue component가 마운트 되었을 때 실행되는 함수입니다.
        // 여기서는 카카오 맵 SDK를 로드하고, SDK가 로드되면
        // 지도를 초기화하는 initMap() 함수를 호출합니다.
        if (window.kakao && window.kakao.maps) {
            // 먼저 조건문을 사용하여 현재 window 객체에 
            // kakao 및 kakao.maps 객체가 있는지 확인합니다.
            this.initMap(); 
            // 만약 이미 kakao와 kakao.maps 객체가 존재한다면,
            // 즉 이미 카카오 맵 SDK가 고드되어 있는 경우에는
            // this.initMap()을 호출하여 지도를 초기화 함
        } else {
            // 만약 kakao와 kakao.maps 객체가 존재하지 않는다면
            // 동적으로 스크립트를 생성하여 카카오 맵 SDK를 로드함.
            const script = document.createElement('script');
            // 새로운 script 엘리먼트를 생성합니다.
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            // 스크립트가 로드되었을 때, onload 이벤트 핸들러를 설정하여
            // this.initMap()을 호출합니다.
            script.src =
                'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9f647a199751b8c18f579fff34313544';
                //스크립트의 소스를 카카오 맵 SDK의 URL로 설정합니다.
            document.head.appendChild(script);
            // 마지막으로 script 엘리먼트를 head 요소에 추가합니다.
        }
    },
    methods: {
        initMap() {
            var mapContainer = document.getElementById('map'); 
            // 지도를 표시할 div 
            var mapOption = {
                center: new kakao.maps.LatLng(37.564343, 126.947613), 
            // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            var map = new kakao.maps.Map(mapContainer, mapOption);

            var positions = [
                {
                    latlng: new kakao.maps.LatLng(37.562632898194835, 126.9454282268269)
                },
                {
                    latlng: new kakao.maps.LatLng(37.56195884514403, 126.94922601468826)
                }
            ];

            positions.forEach(function (pos) {
                var marker = new kakao.maps.Marker({
                    position: pos.latlng // 마커의 위치
                });
                marker.setMap(map);
            });
        }
    }
};
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

.serch {
    display: flex;
    align-items: center;
}

.serch input {
    flex-grow: 1;
    border: 1px solid #000000;
    border-radius: 10px;
    padding: 3px 50px;
    height: 20px;
    width: 100%;
}

.serch .button {
    background-color: #000000;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    margin-left: 5px;
    cursor: pointer;
    width: 50%;

}

.serch .button:hover {
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

.one,
.two,
.three {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
}

.one img,
.two img,
.three img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: 15px 20px 15px 20px;
    padding: 15px 10px 15px 10px;
}

/* 풋터 부분 */
footer {
    border: 1px solid violet;
    height: 15%;
    background-color: rgb(249, 96, 211);
}

.botom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>


<!-- 카카오 맵 SDK는 카카오가 제공하는 지도 관련 서비스를 개발할 수 있도록 도와주는 소프트웨어 개발 키트(SDK)입니다. 
 이 SDK를 사용하면 웹 애플리케이션 또는 모바일 애플리케이션에서 카카오의 지도 서비스를 통합하여 
 사용자에게 지도 표시, 장소 검색, 경로 안내 등의 기능을 제공할 수 있습니다.

카카오 맵 SDK를 사용하면 다음과 같은 기능을 구현할 수 있습니다:

지도 표시: 웹 페이지나 모바일 앱에서 지도를 표시할 수 있습니다.
지도 제어: 지도의 확대, 축소, 이동 등의 사용자 인터랙션을 처리할 수 있습니다.
마커 추가: 특정 위치에 마커를 추가하여 사용자에게 위치 정보를 시각적으로 전달할 수 있습니다.
장소 검색: 지도 상에서 특정 장소를 검색할 수 있도록 기능을 제공합니다.
경로 안내: 출발지와 도착지를 설정하여 경로를 검색하고 안내할 수 있습니다.
지도 데이터 활용: 카카오가 제공하는 다양한 지도 데이터(도로명 주소, 건물 정보, 교통 정보 등)를 활용할 수 있습니다.
이러한 기능을 통해 개발자는 카카오의 지도 서비스를 활용하여 다양한 위치 기반 애플리케이션을 구축할 수 있습니다. -->
