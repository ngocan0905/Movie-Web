<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-slate-800 bg-opacity-60"
  >
    <div
      class="flex relative flex-col w-3/5 h-4/5 justify-center bg-slate-900 rounded-lg"
    >
      <button
        type="button"
        @click="closeModal"
        class="text-white w-fit absolute top-2 right-2 px-2"
      >
        X
      </button>
      <div class="">
        <input
          type="text"
          placeholder="Search for movie, tv, people,.."
          class="py-2 px-4 text-sm text-cyan-100 border-cyan-400 border-b-2 focus:outline-0 bg-inherit absolute top-20 w-full rounded-full"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(["close-modal"]);
function closeModal() {
  emits("close-modal");
}
</script>
