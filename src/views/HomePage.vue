<template>
  <main class="mt-[100px] flex flex-col items-center">
    <div
      class="bg-center bg-home-page text-3xl bg-cover rounded-b-xl bg-no-repeat h-[300px] w-[800px] relative"
    >
      <h1 class="p-4 text-5xl absolute text-cyan-100">
        Welcome.
        <p class="text-3xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
      </h1>
    </div>
    <div class="w-full px-20 mt-10">
      <div class="flex items-end justify-start">
        <h1 class="text-3xl mx-8 font-bold">Trending</h1>
        <SwitchOption
          :option="getBy"
          :handleOptionChange="handleOptionChange"
        />
      </div>
      <div v-if="loading">loading..</div>
      <div v-else>
        <SlideTrending :data="trendingResults" />
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import SlideTrending from "../components/SlideTrending.vue";
import SwitchOption from "../components/SwitchOption.vue";
import axiosClient from "../api/axiosClient";

const data = ref([]);
const loading = ref(true);
const getBy = ref("day");
onMounted(async () => {
  try {
    const res = await axiosClient.get(`trending/all/${getBy.value}`);
    data.value = res.data.results || [];
    console.log(data.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
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
    };
  });
});
</script>
<style></style>
