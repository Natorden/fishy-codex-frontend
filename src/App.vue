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
          <RouterLink to="/home" class="navbarItem">Home</RouterLink>
        </li>
      </ul>
    </div>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <!--        buttons shown when user logged in-->
          <span v-show="isLoggedIn.call()" id="username">{{ userStore.userName }}</span>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="openHome" class="navbarItem">My Fish</RouterLink>
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="openCommunity" class="navbarItem">Community</RouterLink>
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="/friends" class="navbarItem">Friends
              <b-badge variant="success" style="font-size: 0.7em">{{ requestAmount }}</b-badge>
            </RouterLink>
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="editProfile" class="navbarItem">My Profile</RouterLink>
          </li>
          <li class="nav-item active" v-show="isLoggedIn.call()">
            <RouterLink to="" @click="logout" class="navbarItem">Log Out</RouterLink>
          </li>
          <li class="nav-item active" v-show="!isLoggedIn.call()">
            <RouterLink
                to="/login"
                v-show="!isLoggedIn.call()"
                class="navbarItem"
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
import {io} from "socket.io-client";
import {UserStore} from "@/stores/user.store";
import type {User} from "@/models/User";
import { onUpdated, ref } from "vue";
import router from "@/router";
import {RequestService} from "@/services/request.service";
const requestService: RequestService = new RequestService();

const userStore = UserStore();
let sender = ref({} as User);
let requestAmount = ref(0);

let socket = io("localhost:3001");
socket.connect();

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

onUpdated(() => {
  if(sender.value != null) {
    socket.on(sender.value.uuid, from => {
      userStore.addFriendRequests(from);
      requestAmount.value++;
    });

    // Find requests for the logged-in user
    requestService.getFriendRequestByUserId(sender.value.uuid).then((r) => {
      requestAmount.value = r.length;
      r.forEach(req => {
        // Add them to the requests store
        userStore.addFriendRequests(req.senderUserId);
      });
    });
    userStore.getAllFriends(sender.value);
    userStore.getAllUsers();
  }
});

</script>

<style>
#navbarItem {
  margin-right: 1em;
  text-decoration: none;
  color: ghostwhite;
  font-size: 1.2em;
}
.navbarItem {
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
