<template>
  <div class="mt-[100px] mb-16" v-if="data">
    <div class="grid grid-cols-12 pt-[50px]">
      <aside class="grid grid-cols-1 justify-center items-start col-span-4">
        <div class="col-span-1 justify-self-end">
          <img
            :src="imageSrc"
            alt="image"
            class="max-w-[320px] cover rounded-lg"
          />
          <div class="flex">
            <div class="text-2xl font-medium">Personal Info</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Know for</div>
            <div>{{ data.known_for_department }}</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Known Credits</div>
            <div>{{ knownCreditsCount }}</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Gender</div>
            <div>{{ getGender(data.gender) }}</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Birthday</div>
            <div>{{ data.birthday }}</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Place of birth</div>
            <div>{{ data.place_of_birth }}</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Also Known As</div>
            <div class="flex flex-col" v-for="item in data.also_known_as">
              {{ JSON.stringify(item).replace(/\"/g, "") }}
            </div>
          </div>
        </div>
      </aside>
      <main class="col-span-8 grid grid-cols-8">
        <div class="col-span-6 ml-16">
          <div class="">
            <div class="text-4xl font-bold">{{ data.name }}</div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Biography</div>
            <div class="indent-3" v-if="!data.biography">
              We don't have a biography for {{ data.name }}
            </div>
            <div class="indent-3" v-else-if="!showFullBio">
              {{ fullBio }}
              <button
                @click="showFullBio = !showFullBio"
                class="underline hover:text-red-500"
              >
                view more
              </button>
            </div>
            <div class="indent-3" v-else>
              {{ data.biography }}
            </div>
          </div>
          <div class="">
            <div class="text-lg font-medium">Images</div>
            <div>
              <SlidePerson :imgPerson="data.images.profiles" />
            </div>
          </div>
          <div class="flex justify-around my-4">
            <div class="text-2xl font-medium">Know for</div>
            <div class="text-xl flex cursor-pointer">
              <div class="mx-4">
                Movie
                <input type="radio" value="movie" v-model="selectOption" />
              </div>
              <div class="mx-4">
                TV Show <input type="radio" value="tv" v-model="selectOption" />
              </div>
            </div>
          </div>
          <div v-if="selectOption === 'movie'">
            <ListMovieKnowFor :listMovie="data" />
          </div>
          <div v-else-if="selectOption === 'tv'">
            <ListTvShowKnowFor :listTv="data" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {} from "@heroicons/vue/24/outline";
import { computed, onMounted, ref } from "vue";
import axiosClient from "../api/axiosClient";
import { useRoute } from "vue-router";
import SlidePerson from "../components/SlidePerson.vue";
import ListMovieKnowFor from "../components/ListMovieKnowFor.vue";
import ListTvShowKnowFor from "../components/ListTvShowKnowFor.vue";

const data = ref(null);
const route = useRoute();
const showFullBio = ref(false);
const selectOption = ref("movie");
const fetchData = async () => {
  try {
    const response = await axiosClient.get(
      `person/${route.params.id}?append_to_response=combined_credits,images,movie_credits,tv_credits`
    );
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.error(error);
  }
};
function getGender(gender) {
  switch (gender) {
    case 0:
      return "Unknow";
    case 1:
      return "Female";
    case 2:
      return "Male";
    default:
      return "";
  }
}
const fullBio = computed(() => {
  const MAX_LENGTH = 200;
  const bio = data.value.biography;
  return bio.length <= MAX_LENGTH ? bio : `${bio.slice(0, MAX_LENGTH)}.....`;
});
const knownCreditsCount = computed(() => {
  if (!data.value?.combined_credits) {
    return 0;
  }

  const castCredits = data.value.combined_credits.cast?.length ?? 0;
  const crewCredits = data.value.combined_credits.crew?.length ?? 0;
  return castCredits + crewCredits;
});
const imageSrc = computed(() => {
  return `https://image.tmdb.org/t/p/w500${data.value.profile_path}`;
});

onMounted(fetchData);
</script>
