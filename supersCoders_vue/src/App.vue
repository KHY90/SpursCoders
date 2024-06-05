<script>
// Vue Router import
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      location: '위치 알 수 없음',
      logoSrc: './1.png',
      locationIconSrc: './Location.png',
      restaurantIconSrc: 'https://icons.iconarchive.com/icons/aniket-suvarna/box-regular/256/bx-restaurant-icon.png',
      barIconSrc: 'https://icons.iconarchive.com/icons/icons8/windows-8/256/Food-Bar-icon.png',
      hospitalIconSrc: 'https://icons.iconarchive.com/icons/iconoir-team/iconoir/256/hospital-icon.png',
      pharmacyIconSrc: 'https://icons.iconarchive.com/icons/erix-subyarko/medical/256/Pharmacy-Pill-Drug-Bottle-Medicine-icon.png',
      cartIconSrc: 'https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-mono/256/Shopping-Cart-icon.png',
      bankIconSrc: 'https://icons.iconarchive.com/icons/iconsmind/outline/256/Bank-icon.png'
    };
  },
  components: {
    RouterLink
  }
};
</script>

<template>
  <div class="total">
    <header>
      <div class="nav-container">
        <div class="logo">
          <img :src="logoSrc" alt="Logo">
        </div>

        <div class="right-section">
          <div class="location">
            <div>{{ location }}</div>
            <div><img :src="locationIconSrc" alt="Location Icon"></div>
          </div>
        </div>
      </div>

      <div class="search-icon-box">
        <div class="search-icon">
          <img src="assets/Team.png" alt="Search Icon">
        </div>
      </div>

      <div class="search-container">
        <div class="search-box">
          <nav>
            <input type="text" placeholder="search">
            <a href="#" class="clear">✖</a>
            <router-link to="/" class="button">검색</router-link>
          </nav>
        </div>
      </div>
    </header>

    <section class="main-container">
      <nav>
        <div class="sub-container">
          <div class="first">
            <div>
              <router-link to="/food"><img :src="restaurantIconSrc" alt="음식점"></router-link>
            </div>
            <div>
              <router-link to="/bar"><img :src="barIconSrc" alt="술집"></router-link>
            </div>
          </div>

          <div class="second">
            <div>
              <router-link to="/hospital"><img :src="hospitalIconSrc" alt="병원"></router-link>
            </div>
            <div>
              <router-link to="/pharmacy"><img :src="pharmacyIconSrc" alt="약국"></router-link>
            </div>
          </div>

          <div class="third">
            <div>
              <router-link to="/mall"><img :src="cartIconSrc" alt="쇼핑몰"></router-link>
            </div>
            <div>
              <router-link to="/bank"><img :src="bankIconSrc" alt="은행"></router-link>
            </div>
          </div>
        </div>
      </nav>
    </section>
    <footer>
      <nav class="footer-nav">
        <a href="#">홈</a>
        <a href="#">로그아웃</a>
      </nav>
    </footer>
  </div>
</template>

<style scoped></style>
