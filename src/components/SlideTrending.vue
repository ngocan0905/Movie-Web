<template>
  <swiper
    :modules="[Pagination, Navigation]"
    :slidesPerView="5"
    :centeredSlides="false"
    :spaceBetween="30"
    :navigation="true"
    :grabCursor="true"
    :breakpoints="{
      1460: {
        slidesPerView: 6,
      },
      1260: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      360: {
        slidesPerView: 2,
      },
    }"
    class="mt-4"
  >
    <swiper-slide
      v-for="item in data"
      :key="item.id"
      class="bg-slate-200 rounded-md p-2 lg:min-h-[520px] min-h-[360px] text-center hover:bg-slate-300"
    >
      <router-link
        :to="{ name: `${item.type}`, params: { id: item.id } }"
        class=""
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${item.poster}`"
          alt=""
          class="object-cover rounded-t-md"
        />
        {{ item.name }}
        <div class="lg:flex hidden flex-wrap">
          <div v-for="genre in item.genres" :key="genre.id" class="">
            <div
              class="border-slate-500 text-sm border mx-2 my-1 bg-inherit rounded-lg px-2 py-1"
            >
              {{ genreTypeName(genre) }}
            </div>
          </div>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const genres = computed(() => store.state.genres);
onMounted(async () => {
  store.dispatch("fetchGenres");
});

function genreTypeName(genre_id) {
  const genre = genres.value.find((genre) => genre.id === genre_id);
  return genre ? genre.name : "";
}
</script>
<style></style>
