<template>
  <div
    class="flex justify-center items-center z-[101] w-screen h-screen top-0 left-0 absolute bg-[#00000056]"
  >
    <div
      class="flex flex-col justify-center rounded-md h-[900px] w-[1600px] bg-white"
    >
      <p class="text-center">hehe</p>
      <button @click="closeModal" class="self-center flex">Close</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  trailerContent: {
    type: String,
  },
});
const emits = defineEmits(["close-modal"]);
function closeModal() {
  emits("close-modal");
}
</script>
<style>
.asdasd {
  background: #00000056;
}
</style>
