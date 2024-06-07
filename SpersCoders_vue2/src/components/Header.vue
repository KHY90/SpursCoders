<template>
  <header>
    <div class="nav-container">
      <div class="logo">
        <img src="../assets/1.png" alt="로고">
      </div>
      <div class="right-section">
        <div class="location">
          <div>
            위치 알 수 없음
          </div>
          <div>
            <img src="../assets/Location.png" alt="위치 아이콘">
          </div>
        </div>
      </div>
    </div>
    <div class="search-icon-box">
      <div class="search-icon">
        <img src="../assets/Team.png" alt="검색 아이콘">
      </div>
    </div>
    <div class="search-container">
      <div class="search-box">
        <input type="text" placeholder="검색">
        <a class="clear">✖</a>
        <a class="button">검색</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    loggedIn: Boolean // 로그인 상태 여부를 받아오는 prop
  }
}
</script>

<style scoped>
header {
    background: -webkit-linear-gradient(right,  #f7a061, #dc2a2a);
    border-radius: 10px 10px 0 0;
    height: 85px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: relative;
}

.logo img {
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #ccc;
}

.logo img {
    height: 40px;
    margin-right: 10px;
}

.right-section {
    display: flex;
    align-items: center;
    justify-content: flex-end; /* 헤더 오른쪽에 정렬되도록 수정 */
    width: 80%; /* 헤더의 80%의 너비를 차지하도록 설정 */
}

.location {
    display: flex;
    align-items: center;
    color: #ffffff;
    margin : 5px 10px 0 0;
}

.location img {
    height: 20px;
    margin-right: 5px;
    margin-left: 5px;
}

.search-container {
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: center;
}

.search-box {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 80%;
    max-width: 100%;
    padding: 0px 0px;
    height: 70%;
}

.search-icon-box {
    position: absolute;
    left: 80px;
    top: 75px;
    border: 1px solid #ccc;
    transform: translateY(-50%);
}

.search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.search-icon img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #ccc;
}
.search-box img {
    height: 20px;
    margin-right: 10px;
}

.search-box input[type="text"] {
    border: none;
    outline: none;
    width: calc(100% - 50px); /* 아이콘의 크기만큼 너비를 줄입니다. */
    padding: 10px;
    border-radius: 20px;
}

.search-box .clear {
    color: #ff007f;
    text-decoration: none;
    font-size: 20px;
    margin-right: 10px;
}

.search-box .button {
    background-color: #fcfbf9;
    color: black;
    border: none;
    padding: 10px 17px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    font-size: 12px;
    display: inline-block;
    transition: background-color 0.3s ease;
    height: 60%;
}

.search-box .button:hover {
    background-color: #e68900;
}

/* 입력 창과 버튼 스타일 */
.input {
    text-align: right;
    padding: 10px 10px;
}

.input input[type="text"] {
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    width: 70%;
    box-sizing: border-box;
}

.input .button {
    background-color: #1100ffad;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 20px;
    transition: background-color 0.3s ease;
}

.input .button:hover {
    background-color: #0a00dd;
    border: 1px solid #0a00dd;
}

.input-container {
    text-align: center;
}

.button {
    /* padding: 10px 20px; */
    background-color: #1100ffad;
    color: #ffffff;
    border: none;
    cursor: pointer;
}
</style>
