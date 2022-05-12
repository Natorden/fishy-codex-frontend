import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import FishCreate from "../views/FishCreate.vue";
import ProfileView from "../views/ProfileView.vue";

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
      path: "/addFish",
      name: "Add Fish",
      component: FishCreate,
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
  ],
});

export default router;
