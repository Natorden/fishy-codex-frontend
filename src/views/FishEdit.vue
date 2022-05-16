<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Update fish</h2>
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
        @click="updateFish"
        >Update Fish
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { FishStore } from "@/stores/fish.store";
import { ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
const fishStore = FishStore();
const catchNameInput = ref<string>("");
const speciesInput = ref<string>("");
const lengthInput = ref<number>();
const weightInput = ref<number>();

if (fishStore.getFish != null) {
  catchNameInput.value = fishStore.getFish.catchName;
  speciesInput.value = fishStore.getFish.species;
  lengthInput.value = fishStore.getFish.length;
  weightInput.value = fishStore.getFish.weight;
}

const route = useRoute();

function updateFish() {
  if (
    catchNameInput.value.length > 0 &&
    speciesInput.value.length > 0 &&
    lengthInput.value != null &&
    lengthInput.value > 0 &&
    weightInput.value != null &&
    weightInput.value > 0
  ) {
    fishStore.updateFish(
      route.params.fishesId as string,
      catchNameInput.value,
      speciesInput.value,
      lengthInput.value,
      weightInput.value
    );
    router.replace({ path: "/fish" });
  }
}
</script>

<style scoped></style>
