<template>
  <div
    class="fixed inset-0 z-50 flex justify-center items-center bg-slate-900 bg-opacity-60"
  >
    <div
      class="flex flex-col justify-center w-full lg:w-3/5 lg:h-4/5 max-h-900px bg-slate-800 p-2 rounded-md"
    >
      <div v-if="hasVideo" class="relative pb-[56.25%] mb-4">
        <iframe
          :src="videoUrl"
          class="absolute top-0 left-0 w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <button
        @click="closeModal"
        class="self-center py-2 px-4 bg-slate-700 text-cyan-100 text-base lg:text-xl font-medium rounded hover:bg-slate-600"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  trailerContent: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["close-modal"]);

const hasVideo = computed(() => {
  return !!props.trailerContent.videos.results.find(
    (e) => e.type === "Trailer"
  );
});

const videoUrl = computed(() => {
  const video = props.trailerContent?.videos?.results?.find(
    (e) => e.type === "Trailer"
  );
  return `https://www.youtube.com/embed/${video?.key}`;
});

function closeModal() {
  emits("close-modal");
}
</script>

<style scoped>
button:focus {
  outline: none;
  box-shadow: none;
}
</style>
