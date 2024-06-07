<script>

export default {
    name: "App",
    data() {
        return {
            restaurantIconSrc: 'https://icons.iconarchive.com/icons/aniket-suvarna/box-regular/256/bx-restaurant-icon.png',
            mapInstance: null // 오타 수정: Null -> null
        };
    },

    mounted() {
        var container = this.$refs.kakaomap;
        var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3, // 오타 수정: leve3 -> level
        };

        this.mapInstance = new window.kakao.maps.Map(container, options); // 객체 생성 구문 수정
    },

    methods: {
        goToPage(path) {
            this.$router.push(path);
        },

        search() {
            // 검색 기능 구현
        }
    }
};
</script>

<template>
    <div class="input-container">
        <input id="searchInput" type="text" placeholder="장소 이름 입력">
        <button @click="search('/')">검색</button>
    </div>

    <div class="map_wrap" ref="kakaomap">
        <!-- 지도 영역 -->
        <div id="map"></div>
        <!-- 카테고리 선택 영역 -->
        <ul id="category">
            <li @click="component('/food')">
                <img :src="restaurantIconSrc" id="FD6" data-order="0">
                음식점
            </li>
            <li @click="goToPage('/bar')">
                <img :src="restaurantIconSrc" id="CE7" data-order="1">
                술집
            </li>
            <li @click="goToPage('/hospital')">
                <img :src="restaurantIconSrc" id="HP8" data-order="2">
                병원
            </li>
            <li @click="goToPage('/pharmacy')">
                <img :src="restaurantIconSrc" id="PM9" data-order="3">
                약국
            </li>
            <li @click="goToPage('/mall')">
                <img :src="restaurantIconSrc" id="MT1" data-order="4">
                쇼핑몰
            </li>
            <li @click="goToPage('/bank')">
                <img :src="restaurantIconSrc" id="BK9" data-order="5">
                은행
            </li>
        </ul>
        <!-- 마커 정보 목록 -->
        <ul id="markers"></ul>
    </div>
</template>



<!-- 스타일 추가 -->
<style>
.map_wrap,
.map_wrap * {
    margin: 0;
    padding: 0;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    font-size: 12px;
}

.map_wrap {
    position: relative;
    width: 100%;
    height: 350px;
}

#map {
    width: 100%; /* 수정: 지도 크기를 100%로 조정 */
    height: 300px;
}
</style>
