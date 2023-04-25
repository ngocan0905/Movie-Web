<template>
  <div
    class="h-fit flex-col items-center justify-center bg-slate-100 pb-10 pt-[100px]"
  >
    <ContainerDetail :movieById="data" />
    <hr class="border-t-2 mx-8 mt-8" />
    <div
      class="grid grid-cols-12 text-xl justify-center items-center mx-10"
      v-if="data"
    >
      <div class="col-span-9">
        <h1 class="text-2xl font-medium my-4">Cast</h1>
        <SlideCast :creditsData="data" />
      </div>
      <hr class="border-l-2 h-[450px] w-0" />
      <aside class="col-span-2">
        <div>
          <h3 class="text-2xl font-medium">Original Title</h3>
          <div>{{ data.name }}</div>
        </div>
        <div>
          <h3 class="text-2xl font-medium">Status</h3>
          <div>{{ data.status }}</div>
        </div>
        <div>
          <h3 class="text-2xl font-medium">Original Language</h3>
          <div>{{ data.original_language }}</div>
        </div>
        <div>
          <h3 class="text-2xl font-medium">Type</h3>
          <div>{{ data.type }}</div>
        </div>
        <div v-for="item in data.networks" :key="item">
          <h3 class="text-2xl font-medium">Network</h3>
          <div class="hover:text-cyan-500 cursor-pointer">{{ item.name }}</div>
        </div>
        <div
          v-if="data.homepage"
          class="bg-gray-800 text-center py-2 mt-2 px-4 rounded-t-lg cursor-pointer"
        >
          <a
            class="hover:text-cyan-500 text-2xl text-slate-400 rounded-md font-medium"
            :href="data.homepage"
            target="_blank"
          >
            Home page
          </a>
        </div>
        <div
          v-if="data.videos"
          class="bg-slate-300 text-gray-800 hover:text-cyan-500 py-2 px-4 text-center text-2xl font-medium rounded-b-lg cursor-pointer"
          @click="showModal"
        >
          Trailer
        </div>
      </aside>
    </div>
    <hr class="w-full h-0 border-t-2 my-8" />
    <div class="text-2xl font-medium mx-10">Recommendations</div>
    <div class="flex text-2xl mx-10" v-if="data && data.recommendations">
      <div
        class="text-2xl font-medium"
        v-for="item in data.recommendations.results.slice(0, 5)"
        :key="item.id"
      >
        <router-link :to="{ name: 'tv-detail', params: { id: item.id } }"
          ><TvCard :data="item" class="bg-red-400"
        /></router-link>
      </div>
    </div>
    <TrailerModal
      v-if="modal"
      @close-modal="showModal"
      :trailerContent="data"
    />
  </div>
</template>
<script setup>
import TvCard from "../components/TvCard.vue";
import TrailerModal from "../components/TrailerModal.vue";
import SlideCast from "../components/SlideCast.vue";
import ContainerDetail from "../components/ContainerDetail.vue";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../api/axiosClient";
const route = useRoute();
const modal = ref(false);
const data = ref(null);

watchEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosClient.get(
        `tv/${route.params.id}?append_to_response=credits,videos,images,recommendations`
      );
      data.value = response.data;
      console.log(data.value);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
});

function showModal() {
  modal.value = !modal.value;
}
</script>
<style scoped></style>
