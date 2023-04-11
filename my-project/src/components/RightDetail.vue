<template>
  <main class="mt-[100px] flex flex-col">
    <div>
      <div v-for="movie in movie" :key="movie">
        <h1 class="text-3xl text-red-500 font-bold text-center">
          {{ movie.original_title }}
        </h1>
        <div class="text-center">{{ movie.release_date }}</div>
        <hr class="border-t-2" />
        <div class="flex items-end">
          <div class="text-2xl">Rate:</div>
          {{ movie.vote_average }}/{{ movie.vote_count }}
        </div>
        <div>
          <div class="uppercase font-semibold">over view</div>
          <div>{{ movie.overview }}</div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
const props = defineProps({
  movie: {
    type: Object,
  },
});
</script>
