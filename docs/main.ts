import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "../src/style.css";
import "./docs.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: "/:pathMatch(.*)*", component: { template: "<div />" } }],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
