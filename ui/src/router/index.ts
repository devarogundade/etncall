import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BridgeView from "../views/BridgeView.vue";
import MessageView from "@/views/MessageView.vue";
import FaucetView from "@/views/FaucetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/bridge",
      name: "bridge",
      component: BridgeView,
    },
    {
      path: "/messages/:id",
      name: "message",
      component: MessageView,
    },
    {
      path: "/faucet",
      name: "faucet",
      component: FaucetView,
    },
  ],
});

export default router;
