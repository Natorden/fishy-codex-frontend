<template>

  <div
    class="container"
    style="margin: 2em auto; width: 150em; padding: 0.5em; height: 60vh"
  >
    <div class="row h-100">
      <div class="col-4" width="25%">
        <div class="input-group mb-3">
          <input
              style="font-size: 1.5em"
              id="search"
              class="form-control"
              placeholder="Search for a user"
              aria-label="Write the name of user you want to find"
              aria-describedby="basic-addon2"
              v-model="userFilter"
              @keyup="shownUserList = filterUserList(userFilter)"
          />
        </div>
        <b-list-group v-for="(user, index) in shownUserList" v-bind:key="index">
          <b-list-group-item class="justify-content-center">
            <b-container>
              <b-row>
                <b-col cols="10"
                ><span style="font-size: 1.5em">{{ user.name }}</span></b-col
                >
                <b-col cols="2">
                  <b-button
                      variant="success"
                      @click="addFriend(user.uuid)"
                      v-if="user.uuid !== sender.uuid"
                  >Add</b-button
                  >
                </b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        </b-list-group>

        <h4
            v-show="shownUserList.length === 0"
            style="text-align: center"
        >
          There are no users to show
        </h4>
      </div>
      <div class="col-4"  width="25%">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Chat Rooms</h5>
            <hr />
            <ul>
              <li
                class="room"
                v-for="chatRoom in chatStore.chatRooms"
                v-on:click="onRoomClicked(chatRoom.uuid)"
              >
                {{ chatRoom.name }}
              </li>
            </ul>
            <div style="display: flex" class="mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a room name..."
                v-model="chatRoomInput"
              />
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="createNewChatRoom"
              >
                Create Chat Room
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-120">
          <div class="card-body">
            <div class="messages">
              <ul v-if="chatStore.selectChatRoom() != undefined">
                <li v-for="chat in chatStore.selectChatRoom().chats">
                  {{ chat.user.name }}: {{ chat.text }}
                </li>
              </ul>
              <p v-for="typing in chatStore.userTyping">
                {{ typing.name }} is typing...
              </p>
            </div>
            <div style="display: flex" class="mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a message..."
                v-model="chatInput"
                @keydown="onTyping"
              />
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="sendMsg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";
import {ref, watch} from "vue";
import { UserStore } from "@/stores/user.store";
import {RequestService} from "@/services/request.service";

import type {User} from "@/models/User";
import {BCol, BContainer, BListGroup, BListGroupItem, BRow} from "bootstrap-vue-3";
import {storeToRefs} from "pinia";

const requestService: RequestService = new RequestService();
const chatStore = ChatStore();
const userStore = UserStore();

chatStore.loadChatRooms();
chatStore.updateIsTyping();

const chatInput = ref("");
const chatRoomInput = ref("");

let userList = [] as User[];
const shownUserList = ref([] as User[]);
const userFilter = ref("");
const { usersl } = storeToRefs(userStore);

let sender: User;


function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

// function filterUserList(input: string) {
//   const results = userList.filter((user) => user.name.includes(input));
//
//   if (input.length === 0) {
//     return userList;
//   }
//   return results;
// }

watch(usersl, (user) => {
  userList = [] as User[];
  user.forEach((users)=> {
    userList.push(users)
  });
  shownUserList.value = userList;
  console.table(userList)
});

function onRoomClicked(roomUUID: string) {
  chatStore.selectChatRoom(roomUUID);
}

function onTyping() {
  if (chatStore.chatRoomSelected != undefined) {
    chatStore.onUserTyping({
      text: chatInput.value,
      room: chatStore.chatRoomSelected.name,
      userUUID: userStore.loggedIn.uuid,
      user: userStore.loggedIn,
    });
  }
}

function addFriend(friendId: string) {
  if (isLoggedIn())
    requestService.sendFriendRequest(sender.uuid, friendId);
}

function sendMsg() {
  chatStore.createChat(chatInput.value);
}

function createNewChatRoom() {
  chatStore.newChatRoom(chatRoomInput.value);



// Set local user list
  userStore.users.forEach((user) => {
    userList.push(user);
  });

// Set the user list that is displayed
  shownUserList.value = userList;


  if (isLoggedIn()) {
    sender = JSON.parse(<string>localStorage.getItem('user'));
  }

  userStore.getAllUsers();

}
</script>

<style scoped>
.room {
  cursor: pointer;
}

.selected {
  font-weight: bold;
}
</style>
