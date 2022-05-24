<template>
  <div class="container justify-content-center">
    <b-card bg-variant="light">
      <h2 style="text-align: center; margin-bottom: 1.5em">Your Profile</h2>
      <div
        class="container justify-content-center"
        style="width: 25em; margin-bottom: 4em"
      >
        <div>
          <img
              width="400"
              height="400"
              style="margin: 10px; border-radius: 50%;border-color: #2c3e50; border-width: 3px; border-style: solid;"
              alt="avatar"
              :src='profileImageUrl'
          />
          <input class="form-control" v-on:change="getFiles"  ref="fileInput" type="file" id="formFile">
          <b-button @click="clearView">Reset</b-button>
          <b-button @click="uploadProfileImage" style="margin: 5px">Upload Image</b-button>
          <b-progress :value="uploadProgress" :max="100" show-progress animated style="margin-bottom: 5px"></b-progress>
        </div>

        <b-input-group
            append="years"
            style="margin-bottom: 0.5em">
          <b-form-input
              size="md"
              v-model="ageInput"
              id='number'
              type= 'number'
              min="0"
              placeholder="Age"
          >
          </b-form-input>
        </b-input-group>
        <b-form-input
            size="md"
            id='email'
            type= 'email'
            v-model="emailInput"
            placeholder="Email"
            style="margin-bottom:0.5em"
        >
        </b-form-input>
        <b-form-input
          size="md"
          id="password"
          v-model="passwordInput"
          placeholder="Password"
        >
        </b-form-input>
      </div>
      <b-button
        class="container justify-content-center"
        block
        variant="success"
        style="margin-bottom: 5px"
        @click="updateUser"
        >Save changes
      </b-button>
      <b-button
        class="container justify-content-center"
        block
        variant="danger"
        @click="confirmDelete"
        >Delete account
      </b-button>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user.store";
import { ref } from "vue";
import router from "@/router";
import type {User} from "@/models/User";
import { firebaseStorage} from "@/services/firebase";
import { ref as fbRef, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const userStore = UserStore();
let sender = ref({} as User);
const nameInput = ref<string>("");
const ageInput = ref<number>();
const uploadProgress = ref<number>(0);
const emailInput = ref<string>("");
const passwordInput =ref<string>("");
const profileImage = ref<File>();
const profileImageUrl = ref<string>("");

nameInput.value = userStore.userName;
ageInput.value = userStore.userAge;
emailInput.value = userStore.userEmail;
passwordInput.value = userStore.userPassword;
profileImageUrl.value = userStore.userAvatar;

const fileInput = ref("");

function clearView(): any {
  profileImage.value = (null as unknown) as File;
  fileInput.value.value = '';
}

function getFiles(event : any): any {
  profileImage.value = event.target.files[0];
}

  function isLoggedIn(): boolean {
    sender.value = JSON.parse(<string>localStorage.getItem("user")) as User;
    return !!localStorage.getItem("user");
  }

function updateUser() {
  if (
    nameInput.value.length > 0 &&
      ageInput.value != null &&  ageInput.value > 0  &&
    emailInput.value.length > 0 &&
    passwordInput.value.length > 0
  ) {
    console.log( " update",
      userStore.updateUser(
          userStore.loggedIn.uuid,
          nameInput.value,
          ageInput.value,
          emailInput.value,
          passwordInput.value,
          profileImageUrl.value
      ));
  }
  router.push({ path: "/fish" });
}

function deleteUser() {
  userStore.removeUser(userStore.loggedIn.uuid);
  userStore.logout();
}

// display a confirmation dialog before deleting the user
function confirmDelete() {
  if (confirm("Are you sure you want to delete your account?")) {
    deleteUser();
  }
}

// upload profile image to firebase storage
function uploadProfileImage() {
  const profileImageRef = fbRef(firebaseStorage, 'profileImages/' + profileImage.value!!.name);
  const uploadTask = uploadBytesResumable(profileImageRef, profileImage.value!!);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        profileImageUrl.value = url;
      });
    }
  );
}
</script>

<style scoped></style>
