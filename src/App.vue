<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-md">
    <img
      src="@/assets/FishyCodex.png"
      width="50"
      height="50"
      alt="logo"
      style="margin-left: 1em"
    />
    <span
      class="navbar-brand"
      href="#"
      style="margin-left: 1em; font-size: 1.5em; color: #ebb965"
      >Fishy Codex</span
    >
    <!--    Reactive drop down menu, not working atm-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-list-6"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" style="margin-left: 1em">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink to="/home" id="leftNavbarItem1">Home</RouterLink> |
        </li>
      </ul>
    </div>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <!--        is shown when logged in-->
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="logout" id="rightNavbarItem1">Log Out</RouterLink> |
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="editProfile" id="rightNavbarItem2">My Profile</RouterLink> |
          </li>
        </ul>
    </div>



  </nav>

  <header>
    <img
      alt="Fishy Codex Logo"
      class="logo"
      src="@/assets/FishyCodex.png"
      width="192"
      height="192"
    />


    <h1>Welcome to the Fishy Codex</h1>
    <h3>
      Welcome to the Fishy Codex, if you already have an account,
      <router-link to="/login">login</router-link>. If you're new here,
      <router-link to="/register">register</router-link> an account
      <!--      <a target="_blank" href="http://localhost:3000/login">login</a>-->
      <!--      <a target="_blank" href="http://localhost:3000/register">register</a>-->
    </h3>

  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import {UserStore} from "@/stores/user.store";
import type {User} from "@/models/User";
import {ref} from "vue";
import router from "@/router";

const userStore = UserStore();
let sender = ref({} as User);


function isLoggedIn(): boolean {
  sender.value = JSON.parse(<string>localStorage.getItem("user")) as User;
  return !!localStorage.getItem("user");
}

function logout() {
  localStorage.removeItem("user");
  userStore.logout();
}

function editProfile(){
  router.push({ path: "/profile" });
}

</script>

<style></style>
