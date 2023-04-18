<template>
  <div class="mt-[100px] grid grid-cols-12">
    <aside
      class="col-span-2 h-auto flex flex-col bg-slate-100 border-r-2 border-black"
    >
      <button
        class="py-2 px-4 text-red-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full"
      >
        Popular
      </button>
      <button
        class="py-2 px-4 text-red-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full"
      >
        Top Rated
      </button>
      <button
        class="py-2 px-4 text-red-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full"
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
import { computed, onMounted, reactive } from "vue";

const allMovie = reactive({ movies: [] });
const movieList = computed(() => allMovie.movies);
onMounted(async () => {
  try {
    const response = await axiosClient.get("movie/popular");
    allMovie.movies = response.data.results;
    console.log(allMovie.movies);
  } catch (error) {
    console.log(error);
  }
});
</script>
<style scoped></style>
