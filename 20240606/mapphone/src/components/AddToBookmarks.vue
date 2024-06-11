<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="isModalShown" @click="closeModal"></div>
  </transition>
  <transition name="slide" appear>
    <div class="modal" v-if="isModalShown">
      <h1>즐겨찾기</h1>
      <p>즐겨찾기 정보</p>
      <button class="button" @click="closeModal">
        닫기
      </button>
    </div>
  </transition>
</template>



<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isModalShown: Boolean
});

const closeModal = () => {
  // 부모 컴포넌트로 이벤트를 전달합니다.
  emit('closeModal');
};
</script>



<style scoped>
/* 스타일은 그대로 유지합니다. */
</style>
S