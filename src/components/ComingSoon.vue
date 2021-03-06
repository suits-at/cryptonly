<template>
  <div class="text-center">
    <h1 class="mb-8">coming soon...</h1>
    <p class="mb-8">
      made with <v-icon color="red">fas fa-heart fa-1x</v-icon> in Vienna by
      <a href="https://www.suits.at" class="text-decoration-none">SUITS</a>
      &copy; 2021
    </p>
    <router-link to="/" class="text-decoration-none">
      <v-btn to="/" color="teal" class="white--text">
        <span>back to</span>
        <v-icon :right="true">fas fa-home</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ComingSoon"
};
</script>

<style scoped lang="scss"></style>
