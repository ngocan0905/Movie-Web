<template>
  <div>
    <span v-for="i in max" :key="i" @click="updateRating(i)">
      <StarIcon
        :class="{
          'h-4 w-4 text-yellow-500': i <= rating,
          'h-4 w-4 text-gray-400': i > rating,
        }"
      />
    </span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  components: {
    StarIcon,
  },
  props: {
    max: {
      type: Number,
      default: 5,
    },
    rating: {
      type: Number,
      default: 0,
    },
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    starCount() {
      return Math.round(this.movie.vote_average / 2);
    },
  },
  methods: {
    updateRating(newRating) {
      this.$emit("update:rating", newRating);
    },
  },
});
</script>
