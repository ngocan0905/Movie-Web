<template>
  <div class="grid">
    <main class="relative text-slate-100">
      <h1 class="absolute text-4xl z-50 top-20 right-16 font-semibold">
        Now playing
      </h1>
      <SlideHomePage />
    </main>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import SlideHomePage from "../components/SlideHomePage.vue";
const store = useStore();
const movieNowPlaying = computed(() => store.state.movieNowPlaying);
onMounted(() => {
  store.dispatch("fetchMovieNowPlaying");
  console.log(movieNowPlaying);
});
</script>
<style>
.as {
  color: rgba(0, 0, 0, 0.247);
}
</style>
