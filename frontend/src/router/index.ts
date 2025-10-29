import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:year(\\d{4})/:month(1[0-2]|[1-9])",
      name: "monthPage",
      component: HomeView,
    },
  ],
});

export default router;
