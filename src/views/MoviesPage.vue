<template>
  <div class="mt-[100px] grid grid-cols-1 lg:grid-cols-12">
    <aside class="lg:col-span-3 w-full h-fit flex flex-col bg-transparent mx-2">
      <section
        class="text-slate-700 lg:fixed top-32 left-16 lg:w-1/5 px-4 py-3 rounded-lg w-full"
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
        <Transition name="down"
          ><article v-show="option" name="option">
            <button
              class="py-0 lg:py-2 text-cyan-500 mt-4 w-full font-medium hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
              @click="handleGetBy('popular')"
            >
              Popular
            </button>
            <button
              class="py-0 lg:py-2 text-cyan-500 mt-4 w-full font-medium hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
              @click="handleGetBy('top_rated')"
            >
              Top Rated
            </button>
            <button
              class="py-0 lg:py-2 text-cyan-500 mt-4 w-full font-medium hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
              @click="handleGetBy('upcoming')"
            >
              Up Coming
            </button>
          </article></Transition
        >
      </section>
    </aside>
    <div
      class="flex flex-wrap lg:col-span-9 bg-transparent mx-0 lg:mx-10 justify-center font-medium"
    >
      <div v-for="movie in movieList" :key="movie.id" class="">
        <router-link :to="{ name: 'movie-detail', params: { id: movie.id } }"
          ><MovieCard :data="movie" class="duration-300"
        /></router-link>
      </div>
    </div>
  </div>
  <div class="text-center my-4 flex w-full justify-between">
    <button
      v-if="currentPage > 1"
      @click="handlePageChange(currentPage - 1)"
      class="flex items-center justify-start font-bold text-slate-600"
    >
      <ChevronLeftIcon class="h-10 w-10 text-gray-500 font-bold" />
      Prev
    </button>
    <button
      v-else
      disabled
      class="flex items-center justify-start font-bold text-slate-200"
    >
      <ChevronLeftIcon class="h-10 w-10 text-gray-200 font-bold" />
      Prev
    </button>

    <button
      @click="handlePageChange(currentPage + 1)"
      class="flex items-center justify-items-end font-bold text-slate-600"
    >
      Next
      <ChevronRightIcon class="h-10 w-10 text-slate-600" />
    </button>
  </div>
</template>
<script setup>
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
<style scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s ease-in-out;
}

.down-enter-from {
  transform: translateY(-28px);
  opacity: 0;
}
.down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.down-leave-to {
  transform: translateY(-28px);
  opacity: 0;
}
</style>
