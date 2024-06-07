<template>
  <section class="main-container">
    <!-- Main_Category 컴포넌트 추가 -->
    <Main_Category />
    <div class="sub-container">
      <div class="map_wrap">
        <ul id="category">
          <div class="first">
            <div>
              <a href="FoodView.vue" id="FD6" @click="goToCategory('FD6')">
                <img src="https://icons.iconarchive.com/icons/aniket-suvarna/box-regular/256/bx-restaurant-icon.png">
              </a>
              <a href="#" id="CE7" @click="goToCategory('CE7')">
                <img src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Food-Bar-icon.png">
              </a>
            </div>
            <br>

            <div class="second">
              <a href="#" id="HP8" @click="goToCategory('HP8')">
                <img src="https://icons.iconarchive.com/icons/iconoir-team/iconoir/256/hospital-icon.png">
              </a>
              <a href="#" id="PM9" @click="goToCategory('PM9')">
                <img
                  src="https://icons.iconarchive.com/icons/erix-subyarko/medical/256/Pharmacy-Pill-Drug-Bottle-Medicine-icon.png">
              </a>
            </div>


            <div class="third">
              <a href="#" id="MT1" @click="goToCategory('MT1')">
                <img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-mono/256/Shopping-Cart-icon.png">
              </a>
              <a href="#" id="BK9" @click="goToCategory('BK9')">
                <img src="https://icons.iconarchive.com/icons/iconsmind/outline/256/Bank-icon.png">
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </section>
  <!-- 마커 정보 목록 -->
  <ul id="markers"></ul>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToCategory(categoryId) {
  // Vue Router의 동적 라우팅을 사용하여 카테고리 ID를 매개변수로 전달합니다.
  router.push(`/map/${categoryId}`);
}

</script>

<style>
.main-container {
margin-top: 20px;
margin-bottom: 10px;
height: 70vh;
padding: 10px 10px;
}

/* 이미지 사이즈 조정 */
.sub-container div a img {
width: 50%;
/* 이미지 너비 */
height: auto;
/* 높이 자동 조정 */
padding: 10px;
}

.first a {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    border: 1px solid #f7a061;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
}

.second a {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    border: 1px solid #f7a061;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.third a {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    border: 1px solid #f7a061;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sub-container div {
    display: flex;
    justify-content: space-around;
    /* 이미지들을 가운데 정렬하고 간격을 주기 위해 */
    margin-bottom: auto;
    /* 그리드 아래 여백 */
    /* margin-left: 60px;
    margin-right: 10px; */
}
</style>
