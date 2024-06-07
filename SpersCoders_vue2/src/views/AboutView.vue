<template>
    <div>
        <!-- 검색 입력 필드 -->
        <input type="text" v-model="searchQuery" placeholder="장소 이름 입력">
        <button @click="search">검색</button>

        <!-- 검색 결과 표시 -->
        <div v-if="places.length > 0">
            <h2>검색 결과:</h2>
            <ul>
                <li v-for="place in places" :key="place.id">
                    <p>{{ place.name }}</p>
                    <p>{{ place.address }}</p>
                    <p>{{ place.number }}</p>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>검색 결과가 없습니다.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            places: []
        };
    },
    methods: {
        search() {
            // 검색어를 기반으로 API 호출
            axios.get('https://0d81efa0ecfe59e238c0907b1af9c6d7/places/search', {
                params: {
                    query: this.searchQuery
                }
            })
                .then(response => {
                    // API 응답 결과를 places 배열에 저장
                    this.places = response.data;
                })
                .catch(error => {
                    console.error('검색 중 오류 발생:', error);
                });
        }
    }
};
</script>

<style scoped>
/* 스타일링 추가 */
</style>