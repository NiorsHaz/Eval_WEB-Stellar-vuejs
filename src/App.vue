<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
     <RouterView />
  </main>
</template>

<style scoped>
main {
  background-image: linear-gradient(180deg, #242424 0%, #3A3A3A 100%);
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
