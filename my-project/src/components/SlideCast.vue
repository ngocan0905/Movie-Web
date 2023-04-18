<!-- <template>
  <div v-for="(item, index) in creditsData.credits.cast" :key="index">
    <div>{{ item.name }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  creditsData: {
    type: Array,
    required: true,
  },
});
</script> -->
<template>
  <swiper
    :modules="[Pagination]"
    :slidesPerView="6"
    :centeredSlides="false"
    :spaceBetween="30"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(item, index) in creditsData.credits.cast"
      :key="index"
    >
      <div class="flex flex-col justify-center items-center mb-8">
        <img
          :src="
            item.profile_path
              ? `https://image.tmdb.org/t/p/original${item.profile_path}`
              : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
          "
          alt=""
          class="block cover h-[250px] w-auto rounded-md"
        />
        <span class="font-medium">{{ item.name }}</span>
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

// import required modules
import { Pagination } from "swiper";

const props = defineProps({
  creditsData: {
    type: Array,
    required: true,
  },
});
</script>
<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background: #ffffff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
