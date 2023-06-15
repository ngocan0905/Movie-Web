<template>
  <div class="mt-[100px] flex-col justify-center items-center bg-slate-50">
    <div class="text-xl lg:text-3xl font-bold text-cyan-900 text-center w-full">
      Popular people
    </div>
    <div class="flex flex-wrap items-center justify-center font-medium">
      <div v-for="person in personList" :key="person.id" class="">
        <router-link :to="{ name: 'person-detail', params: { id: person.id } }"
          ><PeopleCard :data="person" class="duration-300"
        /></router-link>
      </div>
    </div>
  </div>
  <div class="text-center my-4 flex w-full justify-between">
    <button
      v-if="currentPage > 1"
      @click="handlePageChange(currentPage - 1)"
      class="flex items-center justify-start font-bold text-slate-600"
    >
      <ChevronLeftIcon class="h-10 w-10 text-gray-500 font-bold" />
      Prev
    </button>
    <button
      v-else
      disabled
      class="flex items-center justify-start font-bold text-slate-200"
    >
      <ChevronLeftIcon class="h-10 w-10 text-gray-200 font-bold" />
      Prev
    </button>

    <button
      @click="handlePageChange(currentPage + 1)"
      class="flex items-center justify-items-end font-bold text-slate-600"
    >
      Next
      <ChevronRightIcon class="h-10 w-10 text-slate-600" />
    </button>
  </div>
</template>
<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref, watch } from "vue";
import axiosClient from "../api/axiosClient";
import { useRoute, useRouter } from "vue-router";
import PeopleCard from "../components/PeopleCard.vue";

const route = useRoute();
const router = useRouter();
const getBy = ref("popular");
const personList = ref(null);
const totalResults = ref(1);
const totalPages = ref(1);
const currentPage = ref(
  parseInt(route.query.page) > 1 ? parseInt(route.query.page) : 1
);

const fetchPerson = async () => {
  try {
    const response = await axiosClient.get(
      `person/${getBy.value}?page=${currentPage.value}`
    );
    personList.value = response.data.results;
    totalPages.value = response.data.total_pages;
    totalResults.value = response.data.total_results;
    router.push({ query: { page: currentPage.value } });
  } catch (error) {
    console.log(error);
  }
};
onMounted(fetchPerson);
watch(currentPage, () => {
  fetchPerson();
});
const handlePageChange = (value) => {
  currentPage.value = value;
};
</script>
