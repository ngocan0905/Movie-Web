<template>
  <div class="">
    <HeaderSide /><NavigationSide />
    <main class="">
      <router-view></router-view>
    </main>

    <!-- <FooterSide /> -->
  </div>
</template>
<script setup>
import HeaderSide from "./components/HeaderSide.vue";
// import FooterSide from "./components/FooterSide.vue";
import NavigationSide from "./components/NavigationSide.vue";
</script>
<style>
body::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}
</style>
