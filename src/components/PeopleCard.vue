<template>
  <div
    v-if="data"
    class="bg-slate-200 mx-2 my-4 rounded-md overflow-hidden max-w-[150px] lg:max-w-[300px] p-2 hover:shadow-2xl hover:scale-105"
  >
    <img :src="profileImg" class="h-auto rounded-t-md" alt="" />
    <h3 class="text-center py-2 font-medium">{{ data.name }}</h3>
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
const profileImg = computed(() => {
  return `https://image.tmdb.org/t/p/w500${props.data.profile_path}`;
});
</script>
