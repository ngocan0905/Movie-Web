<template>
  <div class="flex flex-col">
    <div
      class="top-0 fixed left-0 z-[99] justify-between flex w-full items-center pl-16 text-md sm:text-xl lg:text-2xl h-[10%] bg-slate-600"
    >
      <div class="font-bold cursor-pointer">
        <router-link
          :to="{ name: 'home' }"
          class="flex flex-row-reverse text-4xl max-[400px]:text-xl"
        >
          <div class="text-cyan-400 uppercase">VueFilM</div>
        </router-link>
      </div>
      <div class="hidden md:flex">
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
            :to="{ name: 'person' }"
            class="li text-cyan-500 hover:text-cyan-400"
            >People</router-link
          >
        </ul>
      </div>

      <div class="flex items-center">
        <MagnifyingGlassIcon
          class="h-8 w-8 text-cyan-500 mx-2 cursor-pointer flex items-center"
          @click="showModal"
        />
        <Bars3Icon
          class="w-10 h-10 text-cyan-500 hover:scale-105 hover:text-cyan-400 md:hidden cursor-pointer"
          @click="showMenu"
        />
      </div>

      <SearchModal v-if="modal" @close-modal="showModal" />
    </div>
    <!-- menu responesive -->
    <transition name="menu">
      <div
        class="text-red-400 text-xl fixed top-[10%] w-full flex justify-center z-[50] bg-slate-500"
        v-if="mobileMenu"
      >
        <ul class="flex flex-col w-full py-2">
          <router-link
            :to="{ name: 'movie' }"
            @click="showMenu"
            class="li text-cyan-500 hover:text-cyan-400 w-full text-center"
            >Movies</router-link
          >
          <router-link
            :to="{ name: 'tv' }"
            @click="showMenu"
            class="li hover:text-cyan-400 text-cyan-500 py-1 text-center"
            >Series</router-link
          >
          <router-link
            :to="{ name: 'person' }"
            @click="showMenu"
            class="li text-cyan-500 hover:text-cyan-400 text-center"
            >People</router-link
          >
        </ul>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import SearchModal from "./SearchModal.vue";
import { ref } from "vue";
const modal = ref(false);
const mobileMenu = ref(false);
function showModal() {
  modal.value = !modal.value;
}
function showMenu() {
  mobileMenu.value = !mobileMenu.value;
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
.menu-enter-active,
.menu-leave-active {
  transition: all 0.5s ease;
}
.menu-enter-from {
  transform: translateY(-100px);
  opacity: 0;
}
.menu-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.menu-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}
</style>
