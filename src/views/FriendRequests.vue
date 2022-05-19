<template>
  <div class="container" style="width: 40em">
    <b-list-group v-for="(request, index) in requestsShown" v-bind:key="index">
      <b-list-group-item>
        <sub style="font-size: 1.3em; margin-right: 17em">{{
          request.name
        }}</sub>
        <b-button
          variant="success"
          style="margin-right: 0.3em"
          @click="addFriend(request.uuid, index)"
          >Accept
        </b-button>
        <b-button variant="danger" @click="deleteFriendRequest(request.uuid)"
          >Decline</b-button
        >
      </b-list-group-item>
    </b-list-group>
    <h4 v-show="requestsList.length === 0" style="text-align: center">
      You have no friend requests
    </h4>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import type { FriendDto } from "@/models/Friend.dto";
import { FriendService } from "@/services/friend.service";
import { RequestService } from "@/services/request.service";
const requestService: RequestService = new RequestService();
const friendService: FriendService = new FriendService();

const userStore = UserStore();
const requestsList = userStore.requests;
console.log(requestsList);
const requestsShown = ref(requestsList);

function addFriend(friendIdToAdd: string, index: number) {
  const friendToAdd: FriendDto = {
    userOneId: userStore.loggedIn.uuid,
    userTwoId: friendIdToAdd,
  };
  console.log(friendIdToAdd);

  friendService.create(friendToAdd);
  requestsShown.value.splice(index, 1);
  userStore.removeFriendRequest(index);
}

function deleteFriendRequest(requestUuid: string) {
  requestService.deleteFriendRequestWithRequestUuid(requestUuid);
}
</script>

<style scoped></style>
