<template>
  <div class="mt-[100px] grid grid-cols-12">
    <aside
      class="col-span-3 h-fit flex flex-col bg-transparent mx-2 rounded-lg"
    >
      <section
        class="text-slate-700 fixed top-32 left-16 w-1/5 px-4 py-3 rounded-lg shadow-2xl"
      >
        <h1 class="text-3xl font-semibold flex px-4 justify-between">
          Option :
          <div v-if="getBy == `top_rated`">Top Rated</div>
          <div class="capitalize px-2" v-else>{{ getBy }}</div>
          <div @click="changeOption">
            <ChevronDoubleLeftIcon class="h-8 w-8" v-if="!option" />
            <ChevronDoubleDownIcon class="h-8 w-8" v-else />
          </div>
        </h1>
        <div v-if="option" class="delay-500 ease-out duration-300">
          <button
            class="py-2 px-4 text-cyan-500 mt-4 w-full font-medium hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
            @click="handleGetBy('popular')"
          >
            Popular
          </button>
          <button
            class="py-2 px-4 text-cyan-500 mt-4 w-full font-medium hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
            @click="handleGetBy('top_rated')"
          >
            Top Rated
          </button>
          <button
            class="py-2 px-4 text-cyan-500 mt-4 w-full font-medium hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
            @click="handleGetBy('upcoming')"
          >
            Up Coming
          </button>
        </div>
      </section>
    </aside>

    <div
      class="flex flex-wrap col-span-9 bg-transparent mx-10 justify-center font-medium"
    >
      <div v-for="movie in movieList" :key="movie.id" class="">
        <router-link :to="{ name: 'movie-detail', params: { id: movie.id } }"
          ><MovieCard :data="movie"
        /></router-link>
      </div>
      <div class="text-center my-4">
        <div v-if="totalPages > 1">
          <nav class="block">
            <ul class="flex pl-0 rounded-full list-none flex-wrap">
              <li
                v-for="pageNumber in Math.min(totalPages, 10)"
                :key="pageNumber"
              >
                <button
                  class="bg-cyan-200 hover:bg-cyan-400 border rounded-full border-cyan-400 mx-1 font-bold py-2 px-4"
                  :class="{
                    'bg-cyan-500  text-cyan-100': currentPage === pageNumber,
                  }"
                  @click="handlePageChange(pageNumber)"
                >
                  {{ pageNumber }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/vue/24/outline";
import MovieCard from "../components/MovieCard.vue";
import axiosClient from "../api/axiosClient";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const getBy = ref("popular");
const option = ref(true);
const allMovie = reactive({ movies: [] });
const movieList = computed(() => allMovie.movies);
const totalResults = ref(1);
const totalPages = ref(1);
const currentPage = ref(
  parseInt(route.query.page) > 1 ? parseInt(route.query.page) : 1
);

const fetchMovies = async () => {
  try {
    const response = await axiosClient.get(
      `movie/${getBy.value}?page=${currentPage.value}`
    );
    allMovie.movies = response.data.results;
    totalPages.value = response.data.total_pages;
    totalResults.value = response.total_results;
    router.push({ query: { page: currentPage.value } });
  } catch (error) {
    console.log(error);
  }
};
onMounted(fetchMovies);
watch(currentPage, () => {
  fetchMovies();
});
const handlePageChange = (value) => {
  currentPage.value = value;
};
const handleGetBy = (value) => {
  getBy.value = value;
  fetchMovies();
};
function changeOption() {
  option.value = !option.value;
}
</script>
<style scoped></style>
