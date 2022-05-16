<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Add a fish</h2>
      <div
        class="container justify-content-center"
        style="width: 25em; margin-bottom: 4em"
      >
        <b-form-input
          size="md"
          v-model="catchNameInput"
          placeholder="Enter a catch name"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          v-model="speciesInput"
          placeholder="Enter the fish species"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          id="number"
          type="number"
          v-model="lengthInput"
          placeholder="Enter the fish length"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          id="number"
          type="number"
          v-model="weightInput"
          placeholder="Enter the fish weight"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
      </div>
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        @click="registerFish"
        >Register Fish
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { FishStore } from "@/stores/fish.store";
import { ref } from "vue";
import router from "@/router";
import { UserStore } from "@/stores/user.store";
const userStore = UserStore();

const fishStore = FishStore();
const catchNameInput = ref("");
const speciesInput = ref("");
const lengthInput = ref("");
const weightInput = ref("");

function registerFish() {
  if (
    catchNameInput.value.length > 0 &&
    speciesInput.value.length > 0 &&
    lengthInput.value.length > 0 &&
    weightInput.value.length > 0
  ) {
    fishStore.createFish(
      catchNameInput.value,
      speciesInput.value,
      parseInt(lengthInput.value),
      parseInt(weightInput.value),
      userStore.loggedIn.uuid
    );
  }
  router.push({ path: "/home" });
}
</script>

<style scoped></style>
