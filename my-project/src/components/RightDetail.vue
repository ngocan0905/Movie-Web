<template>
  <main class="mt-[100px] flex flex-col items-center">
    <div v-for="(item, index) in movie" :key="index">
      <h1 class="text-3xl text-red-500 font-bold">{{ item.original_title }}</h1>
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
