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
      style="margin-left: 1em; font-size: 1.5em; color: #a3f8e4"
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
          <RouterLink to="/home" id="navbarItem">Home</RouterLink> |
        </li>
      </ul>
    </div>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <!--        buttons shown when user logged in-->
          <span v-show="isLoggedIn.call()" id="username">{{ userStore.userName }}</span>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="openHome" id="navbarItem">My Fish</RouterLink> |
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="openCommunity" id="navbarItem">Community</RouterLink> |
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="editProfile" id="navbarItem">My Profile</RouterLink> |
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="logout" id="navbarItem">Log Out</RouterLink> |
          </li>
          <li class="nav-item active" v-show="!isLoggedIn.call()">
            <RouterLink
                to="/login"
                v-show="!isLoggedIn.call()"
                id="navbarItem"
            >Log In
            </RouterLink
            >
          </li>
        </ul>
    </div>
  </nav>

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

function openCommunity(){
  router.push({ path: "/community" });
}
function openHome(){
  router.push({ path: "/fish" });
}

</script>

<style>
#navbarItem {
  margin-right: 1em;
  text-decoration: none;
  color: ghostwhite;
  font-size: 1.2em;
}

#username {
  margin-right: 1.5em;
  text-decoration: none;
  color: #a3f8e4;
  font-size: 1.2em;
}
</style>
