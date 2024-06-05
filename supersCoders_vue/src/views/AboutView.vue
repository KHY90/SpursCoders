<template>
  <div class="input-container">
    <input id="searchInput" type="text" placeholder="장소 이름 입력">
    <!-- RouterLink를 router-link로 수정 -->
    <router-link :to="{ name: '/' }" @click="search()">검색</router-link>
  </div>

  <div class="map_wrap">
    <!-- 지도 영역 -->
    <div id="map"></div>
    <!-- 카테고리 선택 영역 -->
    <ul id="category">
      <router-link :to="{ name: 'food' }"><img :src="restaurantIconSrc" id="FD6" data-order="0"></router-link>
      음식점
      <router-link :to="{ name: 'bar' }"><img :src="restaurantIconSrc" id="CE7" data-order="1"></router-link>
      술집
      <router-link :to="{ name: 'hospital' }"><img :src="restaurantIconSrc" id="HP8" data-order="2"></router-link>
      병원
      <router-link :to="{ name: 'pharmacy' }"><img :src="restaurantIconSrc" id="PM9" data-order="3"></router-link>
      약국
      <router-link :to="{ name: 'mall' }"><img :src="restaurantIconSrc" id="MT1" data-order="4"></router-link>
      쇼핑몰
      <router-link :to="{ name: 'bank' }"><img :src="restaurantIconSrc" id="BK9" data-order="5"></router-link>
      은행
    </ul>
    <!-- 마커 정보 목록 -->
    <ul id="markers"></ul>
  </div>
</template>

<script>
// Vue Router의 RouterLink를 import할 필요 없음
// import { RouterLink } from 'vue-router';

export default {
  // Vue Router에서 RouterLink 컴포넌트 사용하지 않아서 components 옵션에서 제거
  // components: {
  //   RouterLink
  // }
};
</script>
