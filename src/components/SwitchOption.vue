<template>
  <div class="">
    <div
      class="w-[220px] font-semibold flex mx-auto rounded-3xl bg-white text-cyan-600 relative border-2"
    >
      <div
        ref="btn"
        class="left-0 top-0 absolute w-1/2 h-full bg-slate-400 rounded-3xl duration-500 ease-in-out"
      ></div>
      <button
        class="py-2 px-4 w-1/2 cursor-pointer outline-none relative text-sm lg:text-base flex bg-transparent border-0 justify-center"
        type="button"
        @click="dayClick"
      >
        <h3>Today</h3>
      </button>
      <button
        class="py-2 px-4 w-1/2 cursor-pointer outline-none bg-transparent relative text-sm lg:text-base flex border-0 justify-center"
        type="button"
        @click="tvClick"
      >
        This Week
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  option: {
    type: String,
  },
  handleOptionChange: {
    type: Function,
  },
});
const btn = ref(null);
function dayClick() {
  btn.value.style.left = "0";
  props.handleOptionChange("day");
}
function tvClick() {
  btn.value.style.left = "110px";
  props.handleOptionChange("week");
}
</script>
