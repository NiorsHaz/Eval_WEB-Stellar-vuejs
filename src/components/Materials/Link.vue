<script>
import { createRouter, createWebHistory } from 'vue-router';

export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    text: {
      type: String,
      default: "link"
    }
  }
}
</script>

<template>
  <router-link :to="to" class="custom-link">
    {{ text }}
  </router-link>
</template>

<style scoped>
.custom-link {
  color: #fff;
  text-decoration: none;
}

.custom-link:hover {
  text-decoration: underline;
}
</style>
