<template>
  <swiper
    :modules="[Pagination, Navigation]"
    :slidesPerView="4"
    :centeredSlides="false"
    :spaceBetween="30"
    :navigation="true"
    :grabCursor="true"
    :breakpoints="{
      1260: {
        slidesPerView: 6,
      },
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      360: {
        slidesPerView: 3,
      },
    }"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(item, index) in imgPerson"
      :key="index"
      class="rounded-md overflow-hidden"
    >
      <div class="flex">
        <img
          :src="`https://image.tmdb.org/t/p/w500${item.file_path}`"
          alt=""
          class="block cover h-auto w-auto"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

const props = defineProps({
  imgPerson: {
    type: Array,
    required: true,
  },
});
</script>
<style>
.swiper {
  width: 90%;
  height: 100%;
}

.swiper-slide {
  /* Center slide text vertically */

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(228, 225, 225);
}
</style>
