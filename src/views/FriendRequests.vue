<template>
  <div class="container" style="width: 40em">
    <b-list-group v-for="(request, index) in requestsShown" v-bind:key="index">
      <b-list-group-item>
        <sub style="font-size: 1.3em; margin-right: 17em">{{
          request.senderName
        }}</sub>
        <b-button
          variant="success"
          style="margin-right: 0.3em"
          @click="addFriend(request, index)"
          >Accept
        </b-button>
        <b-button
          variant="danger"
          @click="deleteFriendRequest(request.uuid, index)"
          >Decline</b-button
        >
      </b-list-group-item>
    </b-list-group>
    <h4 v-show="requestsShown.length === 0" style="text-align: center">
      You have no friend requests
    </h4>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { ref, watch } from "vue";
import type { FriendDto } from "@/models/Friend.dto";
import { FriendService } from "@/services/friend.service";
import { RequestService } from "@/services/request.service";
import { storeToRefs } from "pinia";
import type { FriendRequestTransfer } from "@/models/FriendRequestTransfer";
const friendService: FriendService = new FriendService();

const requestService: RequestService = new RequestService();

const userStore = UserStore();
let requestsShownList = [] as FriendRequestTransfer[];
const requestsShown = ref([] as FriendRequestTransfer[]);

const { requestsList } = storeToRefs(userStore);
requestsShownList = userStore.getRequests;
requestsShown.value = requestsShownList;
watch(requestsList, (requestsas) => {
  requestsShownList = [] as FriendRequestTransfer[];
  requestsas.forEach((singleRequest) => {
    requestsShownList.push(singleRequest);
  });
  requestsShown.value = requestsShownList;
});

function addFriend(friendIdToAdd: FriendRequestTransfer, index: number) {
  const friendToAdd: FriendDto = {
    userOneId: userStore.loggedIn.uuid,
    userTwoId: friendIdToAdd.senderUserId,
  };

  friendService.create(friendToAdd);
  requestService.deleteFriendRequestWithRequestUuid(friendIdToAdd.uuid);
  requestsShown.value.splice(index, 1);
  userStore.removeFriendRequest(index);
}

function deleteFriendRequest(requestUuid: string, index: number) {
  requestService.deleteFriendRequestWithRequestUuid(requestUuid);
  requestsShown.value.splice(index, 1);
  userStore.removeFriendRequest(index);
}
</script>

<style scoped></style>
