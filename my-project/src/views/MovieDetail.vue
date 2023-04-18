<template>
  <div class="h-fit flex-col items-center justify-center bg-slate-100">
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
          <div>{{ data.original_title }}</div>
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
          <h3 class="text-2xl font-medium">Budget</h3>
          <div>${{ data.budget }}</div>
        </div>
        <div>
          <h3 class="text-2xl font-medium">Revenue</h3>
          <div>${{ data.revenue }}</div>
        </div>
        <div
          v-if="data.homepage"
          class="bg-gray-800 text-center py-2 mt-2 px-4 rounded-t-lg"
        >
          <a
            class="hover:text-red-400 text-2xl text-red-600 rounded-md font-medium"
            :href="data.homepage"
            target="blank"
          >
            Home page
          </a>
        </div>
        <div
          class="bg-red-600 text-gray-800 hover:text-gray-400 py-2 px-4 text-center text-2xl font-medium rounded-b-lg"
          @click="showModal"
        >
          Trailer
        </div>
      </aside>
    </div>
    <TrailerModal
      v-if="modal"
      @close-modal="showModal"
      :trailerContent="data"
    />
  </div>
</template>
<script setup>
import TrailerModal from "../components/TrailerModal.vue";
import SlideCast from "../components/SlideCast.vue";
import ContainerDetail from "../components/ContainerDetail.vue";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../api/axiosClient";
const route = useRoute();
const modal = ref(false);
const data = ref(null);
onBeforeMount(async () => {
  try {
    const response = await axiosClient.get(
      `movie/${route.params.id}?append_to_response=credits,videos,images`
    );
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
});
function showModal() {
  modal.value = !modal.value;
}
</script>
<style scoped></style>
