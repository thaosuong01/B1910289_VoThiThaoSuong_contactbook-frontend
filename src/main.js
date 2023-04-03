import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { createApp } from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";

import router from "./router";

createApp(App).use(router).use(VueSweetalert2).mount("#app");
