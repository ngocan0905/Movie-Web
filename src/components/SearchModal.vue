<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-slate-800 bg-opacity-60"
  >
    <div
      class="flex relative flex-col w-3/5 h-4/5 justify-start bg-slate-900 rounded-lg overflow-hidden"
    >
      <button
        type="button"
        @click="closeModal"
        class="text-white w-fit px-2 absolute top-1 right-2"
      >
        Close
      </button>
      <div class="h-full">
        <input
          type="text"
          v-model="keyword"
          placeholder="Search for movie, tv, people,.."
          class="py-3 px-4 text-sm text-cyan-100 border-cyan-400 border-b-2 focus:outline-0 bg-inherit w-full rounded-full"
        />
        <ul class="scroll-m-96 max-h-[720px] overflow-y-auto scrollbar-hide">
          <li
            v-for="result in searchResults"
            :key="result.id"
            class="border-b border-cyan-700 h-fit text-cyan-500 text-sm px-2 py-1"
            @click="closeModal"
          >
            <router-link
              :to="{ name: result.type, params: { id: result.id } }"
              class="flex justify-between items-center"
            >
              <div>{{ result.name }}</div>
              <img
                :src="`https://image.tmdb.org/t/p/w500${result.image}`"
                alt=""
                class="h-20 object-cover"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
const store = useStore();
const keyword = ref("");
const emits = defineEmits(["close-modal"]);
const searchResults = computed(() => {
  return store.state.multiSearch.map((result) => {
    return {
      id: result.id,
      name: result.name || result.title || result.original_name,
      image: result.poster_path || result.profile_path,
      type: result.media_type + "-detail",
    };
  });
});

function search() {
  if (keyword.value) {
    store.dispatch("searchMulti", keyword.value);
  } else {
    store.commit("setMultiSearch", []);
  }
}
watch(keyword, (newKeyword, oldKeyword) => {
  search();
  console.log(searchResults.value);
});
onMounted(() => {
  search();
});

function closeModal() {
  emits("close-modal");
}
</script>
<style scoped>
ul::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}
</style>
