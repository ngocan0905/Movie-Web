<template>
  <div class="grid">
    <main class="">
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
