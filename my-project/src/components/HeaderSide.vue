<template>
  <div
    class="top-0 fixed left-0 z-[99] justify-between flex w-full items-center pl-16 text-md sm:text-2xl lg:text-3xl h-[100px] bg-gradient-to-b from-black to-transparent"
  >
    <div class="font-bold cursor-pointer">
      <router-link
        :to="{ name: 'home' }"
        class="flex flex-row-reverse text-4xl"
      >
        <div class="text-red-500 uppercase">VueFilM</div>
      </router-link>
    </div>
    <div class="pl-16">
      <ul class="flex items-center">
        <router-link
          :to="{ name: 'movie' }"
          class="li text-red-500 hover:text-red-800"
          >Movies</router-link
        >
        <router-link
          :to="{ name: 'series' }"
          class="li hover:text-red-800 mx-6 text-red-500"
          >Series</router-link
        >
        <router-link
          :to="{ name: 'tv-show' }"
          class="li text-red-500 hover:text-red-800"
          >TV Shows</router-link
        >
      </ul>
    </div>
    <div class="flex">
      <MagnifyingGlassIcon class="h-10 w-10 text-red-500 mx-2" />
      <BellIcon class="h-10 w-10 text-red-500 mx-2" />
    </div>
  </div>
</template>
<script setup>
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/vue/24/outline";
</script>
<style scoped>
.li {
  position: relative;
}

.li::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  transition: width 0.5s ease;
  height: 2px;
  background: rgb(223, 51, 51);
}

.li:active::after,
.li:hover::after {
  width: 100%;
}

.router-link-exact-active {
  color: rgb(223, 51, 51);
}
</style>
