<template>
  <div v-if="listTv.tv_credits.cast">
    <div class="text-2xl mb-2 mt-4 font-semibold">Acting</div>
    <ul v-for="item in listTv.tv_credits.cast">
      <router-link :to="{ name: 'tv-detail', params: { id: item.id } }"
        ><li
          class="border-t px-2 py-2 flex justify-between cursor-pointer hover:bg-cyan-100"
        >
          <div class="font-medium flex">
            {{ item.original_name }}
            <span class="font-thin mx-2">as</span>
            <div v-if="item.character">{{ item.character }}</div>
            <div v-else>---</div>
          </div>
          <div v-if="item.first_air_date">
            {{ item.first_air_date.slice(0, 4) }}
          </div>
          <div v-else>---</div>
        </li></router-link
      >
    </ul>
  </div>
  <div v-if="listTv.tv_credits.crew">
    <div class="text-2xl mb-2 mt-4 font-semibold">Production</div>
    <ul v-for="item in listTv.tv_credits.crew">
      <router-link :to="{ name: 'tv-detail', params: { id: item.id } }"
        ><li
          class="border-t px-2 py-2 flex justify-between cursor-pointer hover:bg-cyan-100"
        >
          <div class="font-medium">
            {{ item.original_title }}
            <span class="font-thin mx-2">as</span>
            {{ item.character }}
          </div>
          <div>{{ item.release_date.slice(0, 4) }}</div>
        </li></router-link
      >
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  listTv: {
    type: Object,
    required: true,
  },
});
</script>
