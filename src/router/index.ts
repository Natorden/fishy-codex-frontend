import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import FishCreate from "../views/FishCreate.vue";
import FishEdit from "../views/FishEdit.vue";
import ProfileView from "../views/ProfileView.vue";
import CommunityView from "../views/CommunityView.vue";
import MyFishView from "../views/MyFishView.vue";
import FriendRequests from "../views/FriendRequests.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "Log-In",
      component: LoginView,
    },
    {
      path: "/addFish/:usersId",
      name: "Add Fish",
      component: FishCreate,
    },
    {
      path: "/editFish/:fishesId",
      name: "Edit Fish",
      component: FishEdit,
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
    {
      path: "/community",
      name: "Community",
      component: CommunityView,
    },
    {
      path: "/fish",
      name: "Fish",
      component: MyFishView,
    },
    {
      path: "/friends",
      name: "Friends",
      component: FriendRequests,
    },
  ],
});

export default router;
