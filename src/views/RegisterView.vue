<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Register User</h2>
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
        <b-input-group append="years" style="margin-bottom: 0.5em">
          <b-form-input
            size="md"
            v-model="ageInput"
            id="number"
            type="number"
            placeholder="Enter your age"
            min="0"
          >
          </b-form-input>
        </b-input-group>
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
        @click="registerUser"
        >Register User
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import router from "@/router";

const userStore = UserStore();
const nameInput = ref("");
const ageInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");

function registerUser() {
  if (
    nameInput.value.length > 0 &&
    ageInput.value.length > 0 &&
    emailInput.value.length > 0 &&
    passwordInput.value.length > 0
  ) {
    userStore.createUser(
      nameInput.value,
      parseInt(ageInput.value),
      emailInput.value,
      passwordInput.value
    );
    router.push({ path: "/home" });
  }
}
</script>

<style scoped></style>
