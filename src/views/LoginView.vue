<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">LOG IN</h2>
      <div
        class="container justify-content-center"
        style="width: 25em; margin-bottom: 4em"
      >
        <b-form-input
          id="email"
          type="email"
          size="md"
          v-model="emailInput"
          placeholder="Enter your username"
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
        <span>
          Join our community and
          <router-link to="/register">create an account</router-link></span
        >
      </div>
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        @click="logIn"
        >Log in
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import router from "@/router";
import { ref } from "vue";

const userStore = UserStore();
const emailInput = ref("");
const passwordInput = ref("");

function logIn() {
  if (emailInput.value.length > 0 && passwordInput.value.length > 0) {
    if (userStore.logInUser(emailInput.value, passwordInput.value)) {
    }
  }
  return;
}
</script>

<style scoped></style>
