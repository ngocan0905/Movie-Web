<template>
  <div
    v-if="data"
    class="bg-slate-200 mx-2 my-4 rounded-md overflow-hidden max-w-[300px] p-2 hover:shadow-2xl hover:scale-105"
  >
    <img :src="imageSrc" class="h-auto w-[300px] rounded-t-md" alt="" />
    <h3 class="text-center py-2 font-medium">{{ data.title }}</h3>
    <div class="flex flex-wrap">
      <div v-for="item in data.genre_ids" :key="item" class="">
        <div
          class="border-slate-500 text-sm border mx-2 my-1 bg-inherit rounded-lg px-2 py-1"
        >
          {{ genreTypeName(item) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const genresMovie = ref([]);
onMounted(async () => {
  await store.dispatch("fetchGenresMovie");
  genresMovie.value = store.state.genresMovie;
});
watchEffect(() => {
  genresMovie.value = store.state.genresMovie;
});
function genreTypeName(genre_id) {
  const genre = genresMovie.value.find((genre) => genre.id === genre_id);
  return genre ? genre.name : "";
}

const imageSrc = computed(() => {
  return `https://image.tmdb.org/t/p/w500${props.data.poster_path}`;
});
</script>
