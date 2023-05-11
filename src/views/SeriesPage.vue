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
          <div class="capitalize px-2">{{ getBy }}</div>
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
            @click="handleGetBy('on_the_air')"
          >
            On The Air
          </button>
        </div>
      </section>
    </aside>

    <div
      class="flex flex-wrap col-span-9 bg-slate-50 justify-center font-medium"
    >
      <div v-for="film in tvList" :key="film.id" class="">
        <router-link :to="{ name: 'tv-detail', params: { id: film.id } }"
          ><TvCard :data="film"
        /></router-link>
      </div>
      <div class="text-center my-4">
        <div v-if="totalPages > 1">
          <nav class="block">
            <ul class="flex pl-0 rounded list-none flex-wrap">
              <li
                v-for="pageNumber in Math.min(totalPages, 10)"
                :key="pageNumber"
              >
                <button
                  class="bg-gray-200 mx-1 hover:bg-slate-400 border border-slate-200 text-slate-600 font-bold py-2 px-4 rounded"
                  :class="{
                    'bg-cyan-700   text-slate-900': currentPage === pageNumber,
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
<style scoped></style>
