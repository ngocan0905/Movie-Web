<template>
  <swiper
    :modules="[Pagination, Navigation]"
    :slidesPerView="5"
    :centeredSlides="false"
    :spaceBetween="30"
    :navigation="true"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(item, index) in creditsData.credits.cast"
      :key="index"
      class="rounded-md overflow-hidden"
      ><router-link :to="{ name: 'person-detail', params: { id: item.id } }"
        ><div class="flex flex-col justify-center items-center mb-8">
          <img
            :src="
              item.profile_path
                ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            "
            alt=""
            class="block cover h-auto min-h-[332px] w-auto"
          />
          <span class="font-medium">{{ item.name }}</span>
        </div></router-link
      >
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
  creditsData: {
    type: Object,
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
