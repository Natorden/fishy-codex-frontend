<template>
  <div class="greetings">
    <h3>
      Welcome to the Home view, this should display your information if you're
      logged in
    </h3>
    <h3>Add a fish <router-link to="/addFish">here</router-link></h3>
  </div>
  <div class="container" style="margin: 2em auto; width: 50em; padding: 0.5em">
    <b-list-group v-for="(fish, index) in shownFishList" v-bind:key="index">
      <b-list-group-item class="justify-content-center">
        <b-container>
          <b-row>
            <b-col>
              <b-row>
                <b-col>
                  <span style="font-size: 1.5em">{{ fish.catchName }}</span> |
                  <span style="font-size: 1.5em">{{ fish.species }}</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-row>
                    <span style="font-size: 1.5em">{{ fish.length }} cm</span>
                  </b-row>
                  <b-row>
                    <span style="font-size: 1.5em"
                      >{{ fish.weight }} grams</span
                    >
                  </b-row>
                </b-col>
                <b-col></b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-button variant="success" @click="editFish(fish.uuid)"
                >Edit</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </b-list-group-item>
    </b-list-group>
    <h4
      v-show="fishList.length === 0 || shownFishList.length === 0"
      style="text-align: center"
    >
      You haven't recorded any catch yet
    </h4>
  </div>
</template>

<script setup lang="ts">
import { FishStore } from "@/stores/fish.store";
import { ref } from "vue";
import type { Fish } from "@/models/Fish";
import router from "@/router";

const fishStore = FishStore();
let fishList = [] as Fish[];
const shownFishList = ref([] as Fish[]);

fishStore.fishy.forEach((fish) => {
  fishList.push(fish);
});

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

function editFish(fishesId: string) {
  if (isLoggedIn()) router.push({ path: "/editFish" });
}
shownFishList.value = fishList;
fishStore.getAllFish();
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
