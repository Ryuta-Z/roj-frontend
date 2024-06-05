import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";

const router = createRouter({
  history: createWebHistory("/roj"),
  routes,
});

export default router;
