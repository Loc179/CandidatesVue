<template>
  <div class="rating-star">
    <span
      v-for="index in max"
      :key="index"
      class="star"
    >
      <!-- full star -->
      <i
        v-if="props.score >= index"
        class="fa fa-star full"
      />

      <!-- empty star -->
      <i
        v-else
        class="fa fa-star empty"
      />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  score: {
    type: Number,
    required: true,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  }
});

</script>

<style scoped>
.rating-star {
  display: inline-flex;
  align-items: center;
}

.star {
  font-size: 18px;
  margin-right: 4px;
}

.full {
  color: #ffc107; /* vàng */
}

.empty {
  color: #e0e0e0;
}
</style>
