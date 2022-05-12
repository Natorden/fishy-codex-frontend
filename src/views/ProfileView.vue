<template>
  <div class="container justify-content-center">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Your Profile</h2>
      <div
        class="container justify-content-center"
        style="width: 25em; margin-bottom: 4em"
      >
        <b-form-input
          size="md"
          v-model="nameInput"
          placeholder="Enter your username"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          v-model="ageInput"
          placeholder="Enter your age"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          v-model="emailInput"
          placeholder="Enter your email"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          type="password"
          v-model="passwordInput"
          placeholder="Enter your password"
        >
        </b-form-input>
      </div>
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        @click="updateUser"
        >Update Your Profile
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import router from "@/router";
import type {User} from "@/models/User";

const userStore = UserStore();
let sender = ref({} as User);
const nameInput = ref("");
const ageInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");

function isLoggedIn(): boolean {
  sender.value = JSON.parse(<string>localStorage.getItem("user")) as User;
  return !!localStorage.getItem("user");
}

function updateUser() {
  if (
    nameInput.value.length > 0 &&
    ageInput.value.length > 0 &&
    emailInput.value.length > 0 &&
    passwordInput.value.length > 0
  ) {
    userStore.updateUser(
        UserStore.$id,
        nameInput.value,
        parseInt(ageInput.value),
        emailInput.value,
        passwordInput.value
    );
  }
  router.push({ path: "/login" });
}
</script>

<style scoped></style>
