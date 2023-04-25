<template>
  <div
    class="top-0 fixed left-0 z-[99] justify-between flex w-full items-center pl-16 text-md sm:text-2xl lg:text-3xl h-[100px] bg-gradient-to-b from-slate-900 to-transparent"
  >
    <div class="font-bold cursor-pointer">
      <router-link
        :to="{ name: 'home' }"
        class="flex flex-row-reverse text-4xl"
      >
        <div class="text-cyan-400 uppercase">VueFilM</div>
      </router-link>
    </div>
    <div class="pl-16">
      <ul class="flex items-center">
        <router-link
          :to="{ name: 'movie' }"
          class="li text-cyan-500 hover:text-cyan-400"
          >Movies</router-link
        >
        <router-link
          :to="{ name: 'tv' }"
          class="li hover:text-cyan-400 mx-6 text-cyan-500"
          >Series</router-link
        >
        <router-link
          :to="{ name: 'people' }"
          class="li text-cyan-500 hover:text-cyan-400"
          >People</router-link
        >
      </ul>
    </div>
    <div class="flex">
      <MagnifyingGlassIcon
        class="h-10 w-10 text-cyan-500 mx-2 cursor-pointer"
        @click="showModal"
      />
    </div>
    <SearchModal v-if="modal" @close-modal="showModal" />
  </div>
</template>
<script setup>
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/vue/24/outline";
import SearchModal from "./SearchModal.vue";
import { ref } from "vue";
const modal = ref(false);
function showModal() {
  modal.value = !modal.value;
}
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
  background: rgb(177, 228, 243);
}

.li:active::after,
.li:hover::after {
  width: 100%;
}

.router-link-exact-active {
  color: rgb(181, 235, 248);
}
</style>
