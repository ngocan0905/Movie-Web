<template>
  <div class="mt-[100px] grid grid-cols-1 lg:grid-cols-12">
    <aside
      class="col-span-3 h-fit flex flex-col bg-transparent mx-2 rounded-lg"
    >
      <section
        class="text-slate-700 lg:fixed top-32 left-16 w-full lg:w-1/5 px-4 py-3 rounded-lg"
      >
        <h1 class="text-3xl font-semibold flex px-4 justify-between">
          Option :

          <div class="capitalize px-2" v-if="getBy == `on_the_air`">
            On The Air
          </div>
          <div class="capitalize px-2" v-else-if="getBy == `top_rated`">
            Top Rated
          </div>
          <div class="capitalize px-2" v-else>{{ getBy }}</div>
          <div @click="changeOption" class="">
            <ChevronDoubleLeftIcon class="h-8 w-8" v-if="!option" />
            <ChevronDoubleDownIcon class="h-8 w-8" v-else />
          </div>
        </h1>
        <transition name="down">
          <div v-if="option">
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
              @click="handleGetBy('on_the_air')"
            >
              On The Air
            </button>
          </div>
        </transition>
      </section>
    </aside>

    <div
      class="flex flex-wrap col-span-9 bg-slate-50 justify-center font-medium"
    >
      <div v-for="film in tvList" :key="film.id" class="">
        <router-link :to="{ name: 'tv-detail', params: { id: film.id } }"
          ><TvCard :data="film" class="duration-300"
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
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import TvCard from "../components/TvCard.vue";
import axiosClient from "../api/axiosClient";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const getBy = ref("popular");
const option = ref(true);
const tvAll = reactive({ tvs: [] });
const tvList = computed(() => tvAll.tvs);
const totalResults = ref(1);
const totalPages = ref(1);
const currentPage = ref(
  parseInt(route.query.page) > 1 ? parseInt(route.query.page) : 1
);

const fetchTvs = async () => {
  try {
    const response = await axiosClient.get(
      `tv/${getBy.value}?page=${currentPage.value}`
    );
    tvAll.tvs = response.data.results;
    totalPages.value = response.data.total_pages;
    totalResults.value = response.total_results;
    router.push({ query: { page: currentPage.value } });
  } catch (error) {
    console.log(error);
  }
};
onMounted(fetchTvs);
watch(currentPage, () => {
  fetchTvs();
});
const handlePageChange = (value) => {
  currentPage.value = value;
};
const handleGetBy = (value) => {
  getBy.value = value;
  fetchTvs();
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
