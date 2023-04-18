<template>
  <div v-if="data" class="bg-red-200 mx-2 my-4 rounded-md overflow-hidden p-2">
    <img v-lazy="imageSrc" class="h-auto w-[300px] rounded-t-md" alt="" />
    <h3 class="text-center py-2 font-medium">{{ data.title }}</h3>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const imageSrc = computed(() => {
  return `https://image.tmdb.org/t/p/w500${props.data.poster_path}`;
});
</script>
