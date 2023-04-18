<template>
  <div
    v-if="movieById"
    class="mt-[100px] h-fit text-xl flex justify-center py-10"
    style=""
  >
    <div class="flex items-center max-w-[70%]">
      <img
        :src="`https://image.tmdb.org/t/p/original${movieById.poster_path}`"
        class="h-[500px] w-auto rounded-md"
        alt=""
      />
      <div>
        <div class="text-4xl text-red-500 font-bold text-center">
          {{ movieById.title }}
        </div>
        <div class="flex">
          <h1>Release day:</h1>
          <div class="indent-3">{{ movieById.release_date }}</div>
        </div>
        <div class="flex">
          <h3>Genres:</h3>
          <div
            v-for="(genres, index) in movieById.genres"
            :key="index"
            class="mr-2 indent-3"
          >
            <div class="hover:text-rose-500 cursor-pointer">
              {{ genres.name }}
            </div>
          </div>
        </div>
        <div class="flex">
          <h1>Votes:</h1>
          <div class="mr-2 indent-3">{{ movieById.vote_count }} times</div>
          <div>-- {{ movieById.vote_average }}/10</div>
        </div>

        <div>
          <h1 class="text-2xl">Overview</h1>
          <div>{{ movieById.overview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  movieById: {
    type: Object,
    required: true,
  },
});
</script>
