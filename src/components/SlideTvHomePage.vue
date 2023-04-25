<template>
  <div class="m-[0,auto]">
    <Swiper
      :modules="[EffectFade, Pagination, Navigation]"
      :effect="'fade'"
      :navigation="true"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      class=""
    >
      <SwiperSlide v-for="(item, index) in data" :key="index" class="">
        <div
          :style="{
            background: `  url(${getBackdropImage(
              item
            )})  no-repeat center center / cover`,
          }"
          class="w-full h-full grid grid-cols-3 overflow-hidden place-content-center"
        >
          <div class="">
            <img
              :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              alt=""
              class="cover h-[800px] w-auto ml-8 hover:shadow-2xl rounded-md"
            />
          </div>

          <div
            class="text-2xl text-cyan-100 bottom-10 flex flex-col items-center col-span-2 justify-center"
          >
            <div class="text-5xl hover:drop-shadow-2xl font-bold">
              {{ item.name }}
            </div>
            <div>{{ item.release_date }}</div>
            <div>{{ item.vote_average }}</div>
            <router-link
              :to="{ name: 'tv-detail', params: { id: item.id } }"
              class="bg-cyan-500 rounded-lg shadow-2xl w-fit px-5 py-3 shadow-cyan-900 drop-shadow-2xl hover:bg-cyan-700 hover:scale-105"
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
const data = computed(() => store.state.tvAiringToday);
function getBackdropImage(item) {
  return "https://image.tmdb.org/t/p/original" + item.backdrop_path;
}

// const imageData = `https://image.tmdb.org/t/p/w500` +
onMounted(() => store.dispatch("fetchTvAiringToday"));
</script>
<style scoped>
.swiper {
  width: calc(100vw);
  height: 100vh;
  overflow: visible;
  background: #00000060;
}
.swiper-slide {
  opacity: 0.5;
}
.swiper-slide img {
  filter: blur();
}
</style>
