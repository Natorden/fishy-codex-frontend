<template>
  <div class="container justify-content-center" style="width: 60em; margin-top: 4em">
    <b-card bg-variant="light">
      <img

        style="position: center; margin-left: 18em"
        src="https://cdn-icons-png.flaticon.com/512/7374/7374905.png"
        width="300"
        height="300"
        alt="logo"
      />
      <h1 style="text-align: center; margin-bottom: 1.5em">Welcome to The Fishy Codex V2</h1>
      <div
        class="container justify-content-center"
        style="width: 40em; margin-bottom: 4em"
      >
        <h2 style="text-align: center">
          The Online Forum for the enthusiastic like yourself, to share your
          catches, chat with like-minded people, and keep track of your trips!
        </h2>
      </div>
    </b-card>
  </div>
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
