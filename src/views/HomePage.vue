<template>
  <main class="text-slate-100">
    <div class="relative w-screen overflow-hidden">
      <h1 class="absolute text-4xl z-50 top-20 right-16 font-semibold">
        Now Playing ( Movie )
      </h1>
      <SlideHomePage />
    </div>
    <div class="relative w-screen overflow-hidden">
      <h1 class="absolute text-4xl z-50 top-20 right-16 font-semibold">
        Airing Today ( TV )
      </h1>
      <SlideTvHomePage />
    </div>
  </main>
</template>
<script setup>
import SlideHomePage from "../components/SlideHomePage.vue";
import SlideTvHomePage from "../components/SlideTvHomePage.vue";
</script>
<style></style>
