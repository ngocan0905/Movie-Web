<template>
  <div class="mt-[100px] flex-col justify-center items-center bg-red-50">
    <div class="flex flex-wrap items-center justify-center font-medium">
      <div v-for="person in personList" :key="person.id" class="">
        <PeopleCard :data="person" />
      </div>
    </div>
    <div class="pb-6">
      <div v-if="totalPages > 1">
        <nav class="block">
          <ul class="flex pl-0 rounded list-none flex-wrap justify-center">
            <li
              v-for="pageNumber in Math.min(totalPages, 10)"
              :key="pageNumber"
            >
              <button
                class="bg-gray-200 hover:bg-gray-400 border border-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                :class="{
                  'bg-blue-500 hover:bg-blue-700 text-white':
                    currentPage === pageNumber,
                }"
                @click="handlePageChange(pageNumber)"
              >
                {{ pageNumber }}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup>
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
    console.log(personList.value);
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
const handleGetBy = (value) => {
  getBy.value = value;
  fetchPerson();
};
</script>
