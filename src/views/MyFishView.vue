<template>
  <div
    class="container justify-content-center"
    style="width: 80em; margin-top: 4em"
  >
    <b-card bg-variant="light">
      <div>
        <h3 style="margin-left: 2em; margin-top: 2em; text-align: center">
          Welcome to your fish page, this displays your fish that you've logged
        </h3>
        <b-button
          style="
            background-color: #63cbf1;
            border-color: #63cbf1;
          "
          variant="success"
          class="container justify-content-center"
          block
          @click="getUserUuid(userStore.loggedInUser.uuid)"
          >Enter New Catch!</b-button
        >
      </div>
      <div
        class="container"
        style="margin: 2em auto; width: 50em; padding: 0.5em"
      >
        <b-list-group v-for="(fish, index) in shownFishList" v-bind:key="index">
          <b-list-group-item class="justify-content-center">
            <b-container>
              <b-row>
                <b-col cols="2">
                  <img
                    :src="fish.image"
                    width="50"
                    height="50"
                    alt="Fish Image"
                  />
                </b-col>
                <b-col>
                  <b-row>
                    <b-col>
                      <span style="font-size: 1.5em; font-weight: bolder">{{
                        fish.catchName
                      }}</span>
                      |
                      <span style="font-size: 1.5em">{{ fish.species }}</span>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-row>
                        <span style="font-size: 1.5em"
                          >{{ fish.length }} cm</span
                        >
                      </b-row>
                      <b-row>
                        <span style="font-size: 1.5em"
                          >{{ fish.weight }} grams</span
                        >
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-button
                    style="
                      margin-right: 0.5em;
                      background-color: #63cbf1;
                      border-color: #63cbf1;
                      position: center;
                    "
                    variant="success"
                    @click="editFish(fish)"
                    >Edit</b-button
                  >
                  <b-button
                    style="background-color: #63cbf1; border-color: #63cbf1"
                    variant="success"
                    @click="removeFish(fish)"
                    >Delete</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        </b-list-group>
        <h4 v-show="shownFishList.length === 0" style="text-align: center">
          It seems your log is empty, Add your first now!
        </h4>
      </div>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { FishStore } from "@/stores/fish.store";
import { UserStore } from "@/stores/user.store";
import { ref, watch } from "vue";
import type { Fish } from "@/models/Fish";
import router from "@/router";
import { storeToRefs } from "pinia";

const fishStore = FishStore();
const userStore = UserStore();
let fishList = [] as Fish[];
const shownFishList = ref([] as Fish[]);

const { fishy } = storeToRefs(fishStore);

watch(fishy, (fish) => {
  fishList = [] as Fish[];
  fish.forEach((fishes) => {
    if (fishes.user.uuid == userStore.loggedIn.uuid) {
      fishList.push(fishes);
    }
  });
  shownFishList.value = fishList;
  console.table(fishList);
});

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}
function getUserUuid(usersId: string) {
  router.replace({ path: "/addFish/" + usersId });
}

function removeFish(fish: Fish) {
  if (isLoggedIn()) {
    fishStore.removeFish(fish.uuid).then(() => {
      fishStore.getAllFish();
    });
  }
}

function editFish(fish: Fish) {
  fishStore.getSingleFish(fish);
  if (isLoggedIn()) router.push({ path: "/editFish/" + fish.uuid });
}
fishStore.getAllFish();
</script>

<style scoped></style>
