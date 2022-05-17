import { defineStore } from "pinia";
import { UserService } from "@/services/user.service";
import type { User } from "@/models/User";
import type { LoginDto } from "@/models/Login.dto";
import router from "@/router";
import { useStorage } from "@vueuse/core";
import { FriendService } from "@/services/friend.service";

const userService: UserService = new UserService();
const friendsService: FriendService = new FriendService();

export const UserStore = defineStore({
  id: "userStore",
  state: () => ({
    loggedInUser: useStorage("loggedInUser", { email: "" } as User),
    users: [] as User[],
    requests: [] as User[],
    friends: [] as User[],
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
    loggedIn: (state) => {
      if (state.loggedInUser != undefined) return state.loggedInUser;
      return {} as User;
    },
    users: (state) => {
      if (state.users != undefined) return state.users;
      else return [] as User[];
    },
    requests: (state) => {
      if (state.requests != undefined) return state.requests;
      else return [] as User[];
    },
    requestsAmount() {
      return this.requests.length;
    },
    friendsArray: (state) => {
      if (state.friends != undefined) return state.friends;
      else return [] as User[];
    },
  },
  actions: {
    createUser(name: string, age: number, email: string, password: string) {
      userService
        .createUser(name, age, email, password)
        .catch((err) => console.log(err.message));
    },
    updateUser(
      id: string,
      name: string,
      age: number,
      email: string,
      password: string
    ) {
      userService
        .updateUser(id, name, age, email, password)
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
    getAllUsers() {
      userService
        .getAllUsers()
        .then((users) => {
          this.users = [];

          users.forEach((user) => {
            this.users.push(user);
          });
        })
        .catch((err) => console.log(err.message));
    },
    addRequests(userRequestingId: string) {
      // Get user object of the requesting user and add to request store
      userService.getUserById(userRequestingId).then((user) => {
        this.requests.push(user);
      });
    },
    getAllFriends(user: User) {
      friendsService.getAll(user).then((users) => {
        this.$state.friends = users;
      });
    },
  },
});
