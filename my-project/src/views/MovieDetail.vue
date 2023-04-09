<template>
  <main>
    <div v-for="item in movie" :key="item" class="grid grid-cols-3">
      <LeftDetailVue :movie="item" class="col-span-1" />
      <RightDetailVue :movie="item" class="col-span-2" />
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
const movie = ref(null);
onMounted(() => {
  axiosClient.get(`movie/${route.params.id}`).then((data) => {
    movie.value = data;
    console.log(movie.value);
  });
});
function getBackdropImage(item) {
  return "https://image.tmdb.org/t/p/original" + item.backdrop_path;
}
</script>
