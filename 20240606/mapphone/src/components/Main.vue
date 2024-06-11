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
            <div class="serch">
              <input type="text" placeholder="위치를 입력하세요">
              <button class="button">검 색</button>
            </div>
          </div>
        </header>
  
        <div class="totalbody">
          <div class="one">
            <div>
              <RouterLink to="main/foodmap">
                <img src="https://img.icons8.com/?size=100&id=aeLEOHJU5cpb&format=png&color=000000" alt="식당">
              </RouterLink>
            </div>
            <div>
              <img src="https://img.icons8.com/?size=100&id=fR0OOR9q4nZg&format=png&color=000000" alt="술집">
            </div>
          </div>
  
          <div class="two">
            <div>
              <img src="https://img.icons8.com/?size=100&id=BXrlpBmUDxLJ&format=png&color=000000" alt="카페">
            </div>
            <div>
              <img src="https://img.icons8.com/?size=100&id=18160&format=png&color=000000" alt="미용실">
            </div>
          </div>
          <div class="three">
            <div>
              <RouterLink to="main/hospitalmap">
                <img src="https://img.icons8.com/?size=100&id=pTc17tvX2kMn&format=png&color=000000" alt="병원">
              </RouterLink>
            </div>
            <div>
              <img src="https://img.icons8.com/?size=100&id=3rJFC2vi1fHH&format=png&color=000000" alt="약국">
            </div>
          </div>
        </div>
  
        <footer>
          <nav class="bottom">
            <div class="Bookmark">
              <div>
                <RouterLink to="/addtobookmarks"> 즐겨찾기 </RouterLink>
                <!-- AddToBookmarks 컴포넌트를 추가합니다. -->
                <AddToBookmarks :isModalShown="isModalShown" @closeModal="handleCloseModal" />
              </div>
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
  import { ref } from 'vue';
  
  // isModalShown 상태를 정의합니다.
  const isModalShown = ref(false);
  
  // closeModal 함수를 정의합니다.
  const handleCloseModal = () => {
    isModalShown.value = false;
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