<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

let loggedIn = false; // 로그인 상태에 따라 변경할 수 있음
</script>

<template>
  <div class="total">
    <Header :loggedIn="loggedIn" />
    <Main />
    <Footer />
  </div>
  
</template>
<style scoped>
/* 여기에 스타일링 코드 추가 */
</style>
