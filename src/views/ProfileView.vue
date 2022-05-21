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
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
            size="md" v-model="ageInput" id='number' type= 'number'  style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
            size="md" id='email' type= 'email' v-model="emailInput" style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          id="password"
          v-model="passwordInput"
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
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        @click="deleteUser"
        >Delete account
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
const nameInput = ref<string>("");
const ageInput = ref<number>();
const emailInput = ref<string>("");
const passwordInput =ref<string>("");

nameInput.value = userStore.userName;
ageInput.value = userStore.userAge;
emailInput.value = userStore.userEmail;
passwordInput.value = userStore.userPassword

console.log(nameInput.value, ageInput.value)


  function isLoggedIn(): boolean {
    sender.value = JSON.parse(<string>localStorage.getItem("user")) as User;
    return !!localStorage.getItem("user");
  }

function updateUser() {
  if (
    nameInput.value.length > 0 &&
      ageInput.value != null &&  ageInput.value > 0  &&
    emailInput.value.length > 0 &&
    passwordInput.value.length > 0
  ) {
      userStore.updateUser(
          userStore.loggedIn.uuid,
          nameInput.value,
          ageInput.value,
          emailInput.value,
          passwordInput.value
      );
  }
  router.push({ path: "/fish" });
}

function deleteUser() {
  userStore.removeUser(userStore.loggedIn.uuid);
  userStore.logout();
}
</script>

<style scoped></style>
