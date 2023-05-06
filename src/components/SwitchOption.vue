<template>
  <div class="form-box">
    <div
      class="w-[220px] font-semibold flex mx-auto rounded-3xl bg-white relative border-2 justify-around"
    >
      <div
        ref="btn"
        class="left-0 top-0 absolute w-[110px] h-full bg-slate-400 rounded-3xl duration-500 ease-in-out"
      ></div>
      <button
        class="py-2 px-4 cursor-pointer bg-transparent outline-none relative text-center border-0"
        type="button"
        @click="movieClick"
      >
        Today
      </button>
      <button
        class="py-2 px-4 cursor-pointer bg-transparent outline-none relative text-center border-0"
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
function movieClick() {
  btn.value.style.left = "0";
  props.handleOptionChange("day");
}
function tvClick() {
  btn.value.style.left = "110px";
  props.handleOptionChange("week");
}
</script>
