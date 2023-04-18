<template>
  <aside class="mt-[100px] flex flex-col items-center top-16 right-16">
    <div v-for="(item, index) in data" :key="index">
      <img
        :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
        alt=""
        class="h-[600px] w-auto"
      /><TrailerModal
        v-if="modalActive"
        @close-modal="closeModal"
        :trailerContent="item.video"
      />
    </div>

    <button
      class="border-2 mt-3 py-2 px-4 rounded bg-red-500 hover:bg-red-700"
      target="blank"
      @click.prevent="modalActive = !modalActive"
    >
      Watch Trailer
    </button>
    <button class="border-2 mt-3 py-2 px-4 rounded bg-red-500 hover:bg-red-700">
      Home Page
    </button>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import TrailerModal from "./TrailerModal.vue";
const modalActive = ref(false);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
function closeModal() {
  modalActive.value = !modalActive.value;
}
</script>
