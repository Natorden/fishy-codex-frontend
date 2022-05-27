<template>
  <div class="container justify-content-center" style="width: 35em">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Add New Entry</h2>
      <div
        class="container justify-content-center"
        style="width: 25em; margin-bottom: 4em"
      >
        <div>
          <img
            width="400"
            height="400"
            style="
              margin: 10px;
              border-radius: 2%;
              border-color: #2c3e50;
              border-width: 3px;
              border-style: solid;
            "
            alt="avatar"
            :src="fishImageUrl"
          />
          <input
            class="form-control"
            v-on:change="getFiles"
            ref="fileInput"
            type="file"
            id="formFile"
          />
          <b-button @click="clearView">Reset</b-button>
          <b-button @click="uploadFishImage" style="margin: 5px"
            >Upload Image</b-button
          >
          <b-progress
            :value="uploadProgress"
            :max="100"
            show-progress
            animated
            style="margin-bottom: 5px"
          ></b-progress>
        </div>
        <b-form-input
          size="md"
          v-model="catchNameInput"
          placeholder="Title"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          v-model="speciesInput"
          placeholder="Species"
          style="margin-bottom: 0.5em"
        >
        </b-form-input>
        <b-input-group append="cm" style="margin-bottom: 0.5em">
          <b-form-input
            size="md"
            id="number"
            type="number"
            min="10"
            v-model="lengthInput"
            placeholder="Length"
          >
          </b-form-input>
        </b-input-group>
        <b-input-group append="g" style="margin-bottom: 0.5em">
          <b-form-input
            size="md"
            id="number"
            type="number"
            min="10"
            v-model="weightInput"
            placeholder="Weight"
          >
          </b-form-input>
        </b-input-group>
      </div>
      <b-button
        style="
        background-color: #63cbf1;
        border-color: #63cbf1;
      "
        class="container justify-content-center"
        block
        variant="success"
        @click="registerFish"
        >Register Fish
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { FishStore } from "@/stores/fish.store";
import { ref } from "vue";
import router from "@/router";
import { UserStore } from "@/stores/user.store";
import {
  getDownloadURL,
  ref as fbRef,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseStorage } from "@/services/firebase";
const userStore = UserStore();

const fishStore = FishStore();
const catchNameInput = ref("");
const speciesInput = ref("");
const lengthInput = ref("");
const weightInput = ref("");
const uploadProgress = ref<number>(0);
const fishImage = ref<File>();
const fishImageUrl = ref(
  "https://firebasestorage.googleapis.com/v0/b/fishycodexv2.appspot.com/o/profileImages%2FDefault-fish.png?alt=media&token=07c70b95-e325-4ba9-941a-924f9bb1229b"
);

const fileInput = ref("");

function clearView(): any {
  fishImage.value = null as unknown as File;
  fileInput.value.value = "";
  fishImageUrl.value =
    "https://firebasestorage.googleapis.com/v0/b/fishycodexv2.appspot.com/o/profileImages%2FDefault-fish.png?alt=media&token=07c70b95-e325-4ba9-941a-924f9bb1229b";
}

function getFiles(event: any): any {
  fishImage.value = event.target.files[0];
}

function registerFish() {
  fishStore.createFish(
    catchNameInput.value,
    speciesInput.value,
    parseInt(lengthInput.value),
    parseInt(weightInput.value),
    fishImageUrl.value,
    userStore.loggedIn.uuid
  );
  router.push({ path: "/fish?" });
}

// upload fish image to firebase storage
function uploadFishImage() {
  const profileImageRef = fbRef(
    firebaseStorage,
    "profileImages/" + fishImage.value!.name
  );
  const uploadTask = uploadBytesResumable(profileImageRef, fishImage.value!);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      uploadProgress.value =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + uploadProgress.value + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(profileImageRef).then((url) => {
        console.log("File available at", url);
        fishImageUrl.value = url;
      });
    }
  );
}
</script>

<style scoped></style>
