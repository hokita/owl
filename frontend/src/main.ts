import "./assets/main.css";

import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import appoloClient from "./apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";

import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, appoloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(router);

app.mount("#app");
