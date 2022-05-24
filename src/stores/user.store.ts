import { defineStore } from "pinia";
import { UserService } from "@/services/user.service";
import type { User } from "@/models/User";
import type { LoginDto } from "@/models/Login.dto";
import router from "@/router";
import { useStorage } from "@vueuse/core";
import { FriendService } from "@/services/friend.service";
import type { FriendRequestTransfer } from "@/models/FriendRequestTransfer";
import type { Friend } from "@/models/Friend";

const userService: UserService = new UserService();
const friendsService: FriendService = new FriendService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: useStorage("loggedInUser", { email: "" } as User),
    usersInList: [] as User[],
    requestsList: [] as FriendRequestTransfer[],
    friendUsers: [] as User[],
    friends: [] as Friend[],
  }),
  getters: {
    userName: (state) => {
      if (state.loggedInUser.name != undefined) return state.loggedInUser.name;
      else return "";
    },
    userAge: (state) => {
      if (state.loggedInUser.age != undefined) return state.loggedInUser.age;
      else return -1;
    },
    userEmail: (state) => {
      if (state.loggedInUser.email != undefined)
        return state.loggedInUser.email;
      else return "";
    },
    userPassword: (state) => {
      if (state.loggedInUser.password != undefined)
        return state.loggedInUser.password;
      else return "";
    },
    userAvatar: (state) => {
      if (state.loggedInUser.avatar != undefined)
        return state.loggedInUser.avatar;
      else return "";
    },
    loggedIn: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser;
      return {} as User;
    },
    users: (state) => {
      if (state.usersInList != undefined) return state.usersInList;
      else return [] as User[];
    },
    getRequests: (state) => {
      if (state.requestsList != undefined) return state.requestsList;
      else return [] as FriendRequestTransfer[];
    },
    getRequestAmount: (state) => {
      if (state.requestsList != undefined) return state.requestsList.length;
      else return 0;
    },
    friendsArray: (state) => {
      if (state.friendUsers != undefined) return state.friendUsers;
      else return [] as User[];
    },
  },
  actions: {
    createUser(
      name: string,
      age: number,
      email: string,
      password: string,
      avatar: string
    ) {
      userService
        .createUser(name, age, email, password, avatar)
        .catch((err) => console.log(err.message));
    },
    updateUser(
      id: string,
      name: string,
      age: number,
      email: string,
      password: string,
      avatar: string
    ) {
      userService
        .updateUser(id, name, age, email, password, avatar)
        .then((user) => {
          if (user) {
            this.loggedInUser = user;
            const parsed = JSON.stringify(this.loggedInUser);
            localStorage.setItem("user", parsed);
            return true;
          }
        })
        .catch((err) => console.log(err.message));
    },
    removeUser(id: string) {
      userService.removeUser(id).catch((err) => console.log(err.message));
    },
    logInUser(email: string, password: string): boolean {
      const login: LoginDto = {
        email: email,
        password: password,
      };
      router.replace({ path: "/home" });
      userService
        .logIn(login)
        .then((user) => {
          if (user) {
            this.loggedInUser = user;
            const parsed = JSON.stringify(this.loggedInUser);
            localStorage.setItem("user", parsed);
            return true;
          }
        })
        .catch((err) => console.log(err));
      return false;
    },
    logout() {
      this.loggedInUser = { email: "" } as User;
      localStorage.removeItem("user");
      router.replace({ path: "/login" });
    },
    async getAllUsers() {
      await userService
        .getAllUsers()
        .then((userList) => {
          this.usersInList = [];
          userList.forEach((userinos) => {
            this.usersInList.push(userinos);
          });
        })
        .catch((err) => console.log(err.message));
    },
    async addFriendRequests(newRequest: FriendRequestTransfer) {
      this.requestsList.push(newRequest);
    },
    async addAllRequests(allRequests: FriendRequestTransfer[]) {
      this.requestsList = [];
      this.requestsList = allRequests;
    },
    removeFriendRequest(index: number) {
      this.requestsList.splice(index, -1);
    },
    async getAllFriendsById(user: User) {
      await friendsService.getAllById(user).then((users) => {
        this.$state.friendUsers = users;
      });
    },
    async getAllFriends() {
      await friendsService.getAll().then((friends) => {
        this.$state.friends = friends;
      });
    },
  },
});
