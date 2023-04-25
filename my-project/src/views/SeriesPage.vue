<template>
  <div class="mt-[100px] grid grid-cols-12">
    <aside
      class="col-span-2 h-fit pb-4 rounded-br-full flex flex-col bg-slate-100 border-r-2 border-b-2 border-cyan-500"
    >
      <button
        class="py-2 px-4 text-cyan-500 mt-4 font-medium bg-slate-300 mx-4 rounded-r-full hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
        @click="handleGetBy('popular')"
      >
        Popular
      </button>
      <button
        class="py-2 px-4 text-cyan-500 mt-4 w-[70%] font-medium bg-slate-300 mx-4 rounded-r-full hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
        @click="handleGetBy('top_rated')"
      >
        Top Rated
      </button>
      <button
        class="py-2 px-4 text-cyan-500 mt-4 w-[50%] font-medium bg-slate-300 mx-4 rounded-r-full hover:bg-slate-500 hover:text-cyan-100 active:scale-95"
        @click="handleGetBy('on_the_air')"
      >
        On The Air
      </button>
    </aside>

    <div
      class="flex flex-wrap col-span-10 bg-slate-50 items-center justify-center font-medium"
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
import TvCard from "../components/TvCard.vue";
import axiosClient from "../api/axiosClient";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const getBy = ref("popular");
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
</script>
<style scoped></style>
