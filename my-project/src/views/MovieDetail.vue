<template>
  <main class="h-[200vh]">
    <div class="grid grid-cols-12 justify-end">
      <RightDetailVue :movie="movie" class="col-span-9" />
      <LeftDetailVue :data="movie" class="col-span-1" />
    </div>
  </main>
</template>
<script setup>
import RightDetailVue from "../components/RightDetail.vue";
import LeftDetailVue from "../components/LeftDetail.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../api/axiosClient";
const route = useRoute();

const movie = ref([]);

onMounted(() => {
  axiosClient.get(`movie/${route.params.id}`).then(({ data }) => {
    movie.value = Array.isArray(data) ? data : [data];
  });
});
</script>
