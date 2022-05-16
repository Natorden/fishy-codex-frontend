<template>
  <div>
    <h3>
      Welcome to your fish page, this displays your fish that you've logged
    </h3>
    <h3>
      Add a fish
      <router-link to="'/addFish/' + userStore.loggedInUser.uuid"
        >here</router-link
      >
    </h3>
    <b-button variant="success" @click="userStore.loggedInUser.uuid()"
      >Add</b-button
    >
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
              <b-button variant="success" @click="removeFish(fish.uuid)"
                >Delete</b-button
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
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import type { Fish } from "@/models/Fish";
import router from "@/router";

const fishStore = FishStore();
const userStore = UserStore();
let fishList = [] as Fish[];
const shownFishList = ref([] as Fish[]);
const usersId = userStore.loggedInUser.uuid;

fishStore.fishy.forEach((fish) => {
  fishList.push(fish);
});

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}
// function getUserUuid() {
//   const usersId = user.uuid;
//   router.push({ path: "/addFish/" + usersId });
// }

function removeFish(fishesId: string) {
  if (isLoggedIn()) {
    fishStore.removeFish(fishesId);
  }
}

function editFish(fishesId: string) {
  if (isLoggedIn()) router.push({ path: "/editFish/" + fishesId });
}
shownFishList.value = fishList;
fishStore.getAllFish();
</script>

<style scoped></style>
