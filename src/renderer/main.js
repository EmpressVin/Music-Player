import Vue from "vue";
import App from "./App.vue";
import EventListener from "./helpers/eventListeners";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import { remote } from "electron";

// Used to pass data on events between different Vue components
window.Event = new Vue();

// Register all required event listeners
EventListener();

// For debugging
remote.globalShortcut.register("CommandOrControl+Shift+I", () => {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools();
});

window.addEventListener("beforeunload", () => {
  remote.globalShortcut.unregisterAll();
});

// Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
