import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import FishCreate from "../views/FishCreate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/homeView",
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
  ],
});

export default router;
