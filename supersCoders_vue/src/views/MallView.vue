<template>
    <!-- 카테고리의 장소 정보를 출력하는 반복문 -->
    <div v-for="item in category" :key="item.codeNumber">
      <!-- 장소의 코드 번호, 이름, 주소, 전화번호를 출력 -->
      {{ item.codeNumber }} - {{ item.name }} - {{ item.address }} - {{ item.number }}
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // 장소 정보를 저장할 ref 변수 생성
  const category = ref([]);
  
  // 컴포넌트가 마운트된 후에 실행될 함수 정의
  onMounted(() => {
    // 카카오 맵 API를 사용하여 카테고리 정보를 가져오는 요청
    axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
      params: {
        category_group_code: 'MT1', // 쇼핑몰 카테고리 코드
        x: '127.05560862806676', // 경도
        y: '37.548495288349505', // 위도
      },
      headers: {
        Authorization: 'KakaoAK 0d81efa0ecfe59e238c0907b1af9c6d7', // 카카오 API 키
      },
    })
    .then(response => {
      // 응답 데이터를 category ref 변수에 저장
      category.value = response.data;
    })
    .catch(error => {
      console.error(error); // 오류 발생 시 콘솔에 오류 로그 출력
    });
  });
  </script>
  