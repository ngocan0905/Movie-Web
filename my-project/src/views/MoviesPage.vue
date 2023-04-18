<template>
  <div class="mt-[100px] grid grid-cols-12">
    <aside
      class="col-span-2 h-auto flex flex-col bg-slate-100 border-r-2 border-black"
    >
      <button
        class="py-2 px-4 text-red-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full hover:bg-slate-400 active:scale-95"
        @click="handleGetBy('popular')"
      >
        Popular
      </button>
      <button
        class="py-2 px-4 text-red-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full hover:bg-slate-400 active:scale-95"
        @click="handleGetBy('top_rated')"
      >
        Top Rated
      </button>
      <button
        class="py-2 px-4 text-red-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full hover:bg-slate-400 active:scale-95"
        @click="handleGetBy('upcoming')"
      >
        Up Coming
      </button>
    </aside>

    <div
      class="flex flex-wrap col-span-10 bg-red-50 items-center justify-center font-medium"
    >
      <div v-for="movie in movieList" :key="movie.id" class="">
        <router-link :to="{ name: 'detail', params: { id: movie.id } }"
          ><MovieCard :data="movie"
        /></router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import MovieCard from "../components/MovieCard.vue";
import axiosClient from "../api/axiosClient";
import { computed, onMounted, reactive, ref } from "vue";

const getBy = ref("popular");
const allMovie = reactive({ movies: [] });
const movieList = computed(() => allMovie.movies);
const fetchMovies = async () => {
  try {
    const response = await axiosClient.get(`movie/${getBy.value}`);
    allMovie.movies = response.data.results;
  } catch (error) {
    console.log(error);
  }
};
onMounted(fetchMovies);
const handleGetBy = (value) => {
  getBy.value = value;
  fetchMovies();
};
</script>
<style scoped></style>
