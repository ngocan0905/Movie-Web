<template>
  <main class="h-full w-full flex flex-col items-center">
    <div
      class="bg-center mt-[5%] bg-home-page text-3xl bg-cover lg:rounded-b-xl bg-no-repeat h-[300px] lg:w-1/2 w-full relative flex items-center"
    >
      <h1 class="p-4 text-5xl absolute text-cyan-200">
        Welcome.
        <p class="text-3xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
      </h1>
    </div>
    <div class="w-full px-20 mt-10">
      <div class="flex items-end justify-start">
        <h1 class="lg:text-3xl text-xl mx-8 font-bold text-cyan-500">
          Trending
        </h1>
        <SwitchOption
          :option="getBy"
          :handleOptionChange="handleOptionChange"
        />
      </div>
      <div v-if="loading">Loading..</div>
      <div v-else>
        <SlideTrending :data="trendingResults" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref, computed, watch } from "vue";
import SlideTrending from "../components/SlideTrending.vue";
import SwitchOption from "../components/SwitchOption.vue";
import axiosClient from "../api/axiosClient";

const data = ref([]);
const loading = ref(true);
const getBy = ref("day");
onMounted(async () => {
  await fetchData();
});
async function fetchData() {
  try {
    const res = await axiosClient.get(`trending/all/${getBy.value}`);
    data.value = res.data.results || [];
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
function handleOptionChange(newOption) {
  return (getBy.value = newOption);
}

const trendingResults = computed(() => {
  return data.value.map((results) => {
    return {
      id: results.id,
      name: results.name || results.title,
      type: results.media_type + "-detail",
      poster: results.poster_path,
      genres: results.genre_ids,
      genreType: results.media_type,
    };
  });
});
watch(
  () => getBy.value,
  async () => {
    loading.value = true;
    await fetchData();
  }
);
</script>
<style></style>
