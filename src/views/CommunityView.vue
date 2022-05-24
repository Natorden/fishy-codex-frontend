<template>
  <div
    class="container"
    style="margin: 2em auto; width: 150em; padding: 0.5em; height: 60vh"
  >
    <div class="row h-100">
      <!--      users list begins here-->
      <div class="col-4 width25">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Users</h5>
            <hr />
            <div class="input-group mb-3">
              <input
                id="search"
                class="form-control"
                placeholder="Search for a user"
                aria-label="Write the name of user you want to find"
                aria-describedby="basic-addon2"
                v-model="userFilter"
                @keyup="shownUserList = filterUserList(userFilter)"
              />
            </div>
            <hr />
            <b-list-group
              v-for="(user, index) in shownUserList"
              v-bind:key="index"
            >
              <b-list-group-item class="justify-content-center">
                <b-container>
                  <b-row>
                    <b-col cols="4">
                      <img
                        :src="user.avatar"
                        width="50"
                        height="50"
                        alt="Profile picture"
                        style="border-radius: 50%"
                      />
                    </b-col>
                    <b-col cols="8"
                      ><span style="font-size: 1.5em">{{
                        user.name
                      }}</span></b-col
                    >
                    <b-col cols="2">
                      <b-button
                        variant="success"
                        @click="addFriend(user.uuid)"
                        v-if="user.uuid !== sender.uuid && !isFriend(user.uuid)"
                        >Add</b-button
                      >
                    </b-col>
                  </b-row>
                </b-container>
              </b-list-group-item>
            </b-list-group>
            <h4 v-show="shownUserList.length === 0" style="text-align: center">
              There are no users to show
            </h4>
          </div>
        </div>
      </div>
      <!--      spacing between users list and rooms list-->
      <div class="col-4 width25">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Chat Rooms</h5>
            <hr />
            <div style="display: flex" class="mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a room name..."
                v-model="chatRoomInput"
                minlength="3"
              />
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="createNewChatRoom"
              >
                Create
              </button>
            </div>
            <hr />
            <h5 class="card-title">Available Chat Rooms</h5>
            <hr />
            <ul>
              <li
                class="room"
                v-for="chatRoom in chatStore.chatRooms"
                v-on:click="onRoomClicked(chatRoom)"
                v-bind:key="chatRoom.uuid"
                style="margin-bottom: 5px; border-bottom: 1px solid #ccc"
              >
                {{ chatRoom.name }}
              </li>
            </ul>
            <hr />
          </div>
        </div>
      </div>
      <!--      spacing between rooms list and chat messages-->
      <div class="col width50">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Chat Room: {{ currentChatRoom.name }}</h5>
            <hr />
            <div style="display: flex" class="mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a message..."
                v-model="chatInput"
                @keydown="onTyping"
                minlength="1"
              />
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="sendMsg"
              >
                Send
              </button>
              <b-dropdown
                text="Send fish"
                block
                variant="primary"
                menu-class="w-100"
              >
                <b-dropdown-item
                  v-for="(fish, index) in shownFishList"
                  v-bind:key="index"
                  v-on:click="onFishClicked(fish)"
                  >{{ fish.catchName }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <hr />
            <div class="messages" style="overflow-y: scroll; height: 60vh">
              <ul v-if="currentChatRoom !== undefined">
                <li v-for="chat in currentChatRoom.chats">
                  <img
                    :src="chat.user.avatar"
                    width="50"
                    height="50"
                    alt="Profile picture"
                    style="border-radius: 50%"
                  />
                  {{ chat.user.name }}: {{ chat.text }}
                </li>
              </ul>
              <p v-for="typing in chatStore.userTyping">
                {{ typing.name }} is typing...
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--      messages ends here-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chat.store";
import { ref, watch } from "vue";
import { UserStore } from "@/stores/user.store";
import { RequestService } from "@/services/request.service";

import type { User } from "@/models/User";
import {
  BCol,
  BContainer,
  BListGroup,
  BListGroupItem,
  BRow,
} from "bootstrap-vue-3";
import { storeToRefs } from "pinia";
import type { ChatRoom } from "@/models/ChatRoom";
import { FriendService } from "@/services/friend.service";
import type { Friend } from "@/models/Friend";
import type { Fish } from "@/models/Fish";
import { FishStore } from "@/stores/fish.store";

const requestService: RequestService = new RequestService();
const friendService: FriendService = new FriendService();
const chatStore = ChatStore();
const userStore = UserStore();
const fishStore = FishStore();

//fish
const shownFishList = ref([] as Fish[]);
const { fishy } = storeToRefs(fishStore);
let fishList = [] as Fish[];

//users
let userList = [] as User[];
const shownUserList = ref([] as User[]);
const { usersInList } = storeToRefs(userStore);

//chat rooms
let chatRoomList = [] as ChatRoom[];
const shownChatRoomList = ref([] as ChatRoom[]);
const userFilter = ref("");
const { chatRooms, chatRoomSelected } = storeToRefs(chatStore);
const chatInput = ref("");
const chatRoomInput = ref("");
const currentChatRoom = ref({} as ChatRoom);
const selectedItem = ref("");
chatStore.loadChatRooms();
chatStore.updateIsTyping();
userStore.getAllUsers();
const sender = userStore.loggedIn;

let show = ref(false);
const isOpen = () => (show.value = !show.value);

const loopList = fishStore.getAllFishes;
fishList = [] as Fish[];
loopList.forEach((fishes) => {
  if (fishes.user.uuid == userStore.loggedIn.uuid) {
    fishList.push(fishes);
  }
});
shownFishList.value = fishList;

function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}

function filterUserList(input: string) {
  const results = userList.filter((user) =>
    user.name.toLocaleLowerCase().includes(input)
  );

  if (input.length === 0) {
    return userList;
  }
  return results;
}

watch(chatRoomSelected, (newChatRoom) => {
  if (newChatRoom != undefined) {
    currentChatRoom.value = newChatRoom;
  }
});

watch(usersInList, (user) => {
  userList = [] as User[];
  user.forEach((users) => {
    userList.push(users);
  });
  shownUserList.value = userList;
});

watch(chatRooms, (chatRooms) => {
  if (chatRooms) {
    chatRoomList = [] as ChatRoom[];
    chatRooms.forEach((chatRoom) => {
      chatRoomList.push(chatRoom);
    });
    shownChatRoomList.value = chatRoomList;
  }
});

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

function onRoomClicked(room: ChatRoom) {
  chatStore.selectChatRoom(room);
}

function onTyping() {
  if (chatStore.chatRoomSelected != undefined) {
    chatStore.onUserTyping({
      text: chatInput.value,
      chatRoom: chatStore.chatRoomSelected.name,
      userUUID: userStore.loggedIn.uuid,
      user: userStore.loggedIn,
    });
  }
}

function addFriend(friendId: string) {
  if (isLoggedIn()) requestService.sendFriendRequest(sender.uuid, friendId);
  console.log(sender.uuid, friendId);
}

function onFishClicked(fish: Fish) {
  console.log(fish.catchName);
}

//TODO: Optimize this
function isFriend(friendId: string): boolean {
  userStore.$state.friendUsers.forEach((friend: User) => {
    if (friend.uuid === friendId) {
      console.log("is friend");
      return true;
    }
  });
  console.log(friendId + "is not friend");
  return false;
}

//TODO: Optimize this
function removeFriend(friendId: string) {
  userStore.$state.friends.forEach((friend: Friend) => {
    switch (friendId) {
      case friend.userOneId:
        if (friend.userTwoId === userStore.loggedIn.uuid) {
          friendService.remove(friend);
        }
        break;
      case friend.userTwoId:
        if (friend.userOneId === userStore.loggedIn.uuid) {
          friendService.remove(friend);
        }
        break;
    }
  });
  return false;
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

  userStore.getAllUsers();
}
</script>

<style scoped>
.room {
  cursor: pointer;
}

.width25 {
  width: 25% !important;
}
.width50 {
  width: 50% !important;
}

.selected {
  font-weight: bold;
}
</style>
