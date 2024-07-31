import { createApp } from "vue";
import "virtual:uno.css";
import axios from "axios";

import "./style.css";
import App from "./App.vue";

axios.defaults.baseURL = "https://hacker-news.firebaseio.com/v0/";
createApp(App).mount("#app");
