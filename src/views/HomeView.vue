<template>
  <header>
    <h3>
      (temprary text, remove later )Welcome to the Fishy Codex, if you already
      have an account,
      <router-link to="/login">login</router-link>. If you're new here,
      <router-link to="/register">register</router-link> an account
    </h3>
  </header>
</template>

<script setup lang="ts">
import { FishStore } from "@/stores/fish.store";
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import type { Fish } from "@/models/Fish";

const fishStore = FishStore();
const userStore = UserStore();
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
