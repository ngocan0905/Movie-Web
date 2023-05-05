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
    <swiper-slide v-for="item in data" :key="item.id" class="bg-slate-400">
      <router-link :to="{ name: `${item.type}`, params: { id: item.id } }"
        ><img :src="`https://image.tmdb.org/t/p/w500${item.poster}`" alt="" />
        {{ item.name }}
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

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<style></style>
