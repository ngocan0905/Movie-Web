<template>
  <aside class="mt-[100px] flex flex-col items-center">
    <div v-for="(item, index) in movie" :key="index">
      <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" alt="" />
    </div>
    <button class="border-2 mt-3 py-2 px-4 rounded bg-red-500 hover:bg-red-700">
      Watch Trailer
    </button>
    <button class="border-2 mt-3 py-2 px-4 rounded bg-red-500 hover:bg-red-700">
      Home Page
    </button>
  </aside>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
  },
});
</script>
