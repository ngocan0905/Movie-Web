<template>
  <div class="h-[200vh] flex-col items-center justify-center">
    <ContainerDetail :movieById="data" />
    <div
      class="grid grid-cols-12 text-xl justify-center items-center mx-10"
      v-if="data"
    >
      <div class="col-span-9">
        <h1 class="text-2xl font-medium my-4">Cast</h1>
        <SlideCast :creditsData="data" />
      </div>
      <aside class="col-span-3 ml-4">
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
      </aside>
    </div>
  </div>
</template>
<script setup>
import SlideCast from "../components/SlideCast.vue";
import ContainerDetail from "../components/ContainerDetail.vue";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../api/axiosClient";
const route = useRoute();

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
</script>
<style scoped></style>
