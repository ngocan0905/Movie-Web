<template>
  <div
    v-if="movieById"
    class="h-fit text-xl text-slate-600 flex justify-center py-10 bg-slate-200"
    style=""
  >
    <div class="flex items-center max-w-[80%]">
      <img
        :src="`https://image.tmdb.org/t/p/original${movieById.poster_path}`"
        class="h-[500px] w-auto rounded-md"
        alt=""
      />
      <div class="ml-8">
        <div class="text-4xl text-slate-700 font-bold text-center">
          {{ movieById.title || movieById.name }}
          <div v-if="movieById.release_date">
            {{ movieById.release_date.slice(0, 4) }}
          </div>
        </div>
        <div class="flex">
          <h3 class="font-medium">Release day:</h3>
          <div class="indent-3">
            {{ movieById.release_date || movieById.first_air_date }}
          </div>
        </div>
        <div class="flex">
          <h3 class="font-medium">Genres:</h3>
          <div
            v-for="(genres, index) in movieById.genres"
            :key="index"
            class="mr-2 indent-3"
          >
            <div class="hover:text-cyan-500 cursor-pointer">
              {{ genres.name }}
            </div>
          </div>
        </div>
        <div class="flex">
          <h1 class="font-medium">Votes:</h1>
          <div class="mr-2 indent-3">{{ movieById.vote_count }} times</div>
          <div>-- {{ movieById.vote_average }}/10</div>
        </div>

        <div>
          <h1 class="text-2xl font-medium">Overview</h1>
          <div class="indent-3">{{ movieById.overview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { props } = defineProps({
  movieById: {
    type: Object,
  },
});
</script>
