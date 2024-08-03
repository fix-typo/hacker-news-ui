import { createApp } from "vue";
import "virtual:uno.css";
import axios from "axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./style.css";
import App from "./App.vue";

axios.defaults.baseURL = "https://hacker-news.firebaseio.com/v0/";

createApp(App).use(ElementPlus).mount("#app");
