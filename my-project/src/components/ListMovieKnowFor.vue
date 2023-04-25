<template>
  <div v-if="listMovie.movie_credits.cast">
    <div class="text-2xl mb-2 mt-4 font-semibold">Acting</div>
    <ul v-for="item in listMovie.movie_credits.cast">
      <router-link :to="{ name: 'movie-detail', params: { id: item.id } }">
        <li class="border-t px-2 py-2 flex justify-between hover:bg-cyan-100">
          <div class="font-medium flex">
            {{ item.original_title }}
            <span class="font-thin mx-2">as</span>
            <div v-if="item.character">{{ item.character }}</div>
            <div v-else>---</div>
          </div>
          <div v-if="item.release_date">
            {{ item.release_date.slice(0, 4) }}
          </div>
          <div v-else>---</div>
        </li>
      </router-link>
    </ul>
  </div>
  <div v-if="listMovie.movie_credits.crew">
    <div class="text-2xl mb-2 mt-4 font-semibold">Production</div>
    <ul v-for="item in listMovie.movie_credits.crew">
      <router-link :to="{ name: 'movie-detail', params: { id: item.id } }">
        <li class="border-t px-2 py-2 flex justify-between hover:bg-cyan-100">
          <div class="font-medium flex">
            {{ item.original_title }}
            <span class="font-thin mx-2">...</span>
            <div v-if="!item.job">Unknow</div>
            <div v-else>{{ item.job }}</div>
          </div>
          <div class="font-thin">{{ item.release_date.slice(0, 4) }}</div>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  listMovie: {
    type: Object,
    required: true,
  },
});
</script>
