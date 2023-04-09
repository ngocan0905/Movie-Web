<template>
  <div class="w-screen m-[0,auto]">
    <Swiper
      :modules="[EffectFade, Pagination, Navigation]"
      :effect="'fade'"
      :navigation="true"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
    >
      <SwiperSlide
        v-for="(item, index) in data"
        :key="index"
        :style="{
          background: `url(${getBackdropImage(
            item
          )}) no-repeat center center / cover`,
        }"
      >
        <div
          class="w-full h-full grid grid-cols-3 overflow-hidden place-content-center"
        >
          <div class="">
            <img
              :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              alt=""
              class="cover"
            />
          </div>

          <div
            class="text-2xl bottom-10 flex flex-col items-center col-span-2 justify-center"
          >
            <div class="text-5xl hover:drop-shadow-2xl font-bold">
              {{ item.original_title }}
            </div>
            <div>{{ item.release_date }}</div>
            <div>{{ item.vote_average }}</div>
            <router-link
              :to="{ name: 'detail', params: { id: item.id } }"
              class="bg-red-500 shadow-2xl w-fit px-5 py-3 shadow-red-900 drop-shadow-2xl hover:bg-red-700 hover:scale-105 hover:underline"
            >
              Watch now
            </router-link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const data = computed(() => store.state.movieNowPlaying);
function getBackdropImage(item) {
  return "https://image.tmdb.org/t/p/original" + item.backdrop_path;
}

// const imageData = `https://image.tmdb.org/t/p/w500` +
onMounted(() => store.dispatch("fetchMovieNowPlaying"));
</script>
<style scoped>
.swiper {
  width: calc(100vw);
  height: 100vh;
  overflow: visible;
  background: #000000f6;
}
.swiper-slide img {
  width: 100%;
  filter: blur(0);
  border-radius: 100%;
  padding: 0 36px;
}
</style>
