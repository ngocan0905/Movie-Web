<template>
  <main class="mt-[100px]">
    <div v-if="personList">
      <div v-for="(person, index) in personList" :key="index">
        <div class="tex-2xl">{{ person.name }}</div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "../api/axiosClient";

const personList = ref(null);

onMounted(async () => {
  try {
    const response = await axiosClient.get(`person/popular`);
    personList.value = response.data.results;
    console.log(personList.value);
  } catch (error) {
    console.log(error);
  }
});
</script>
