<template>
  <footer>
    <nav class="footer-nav">
      <a href="#">홈</a>
      <a href="#">로그아웃</a>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
    border-radius: 0 0 10px 10px;
    background: -webkit-linear-gradient(right,  #f7a061, #dc2a2a);
    padding: 15px;
    text-align: center;
}

/* Footer 네비게이션바 스타일 */
.footer-nav {
    display: flex;
    justify-content: space-around;
}

.footer-nav a {
    color: #fff;
    text-decoration: none;
    padding: 10px;
}</style>
