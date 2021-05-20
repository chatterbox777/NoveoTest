import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import vSelect from "vue-select";

import VueObserveVisibility from "vue-observe-visibility";

Vue.use(VueObserveVisibility);
Vue.component("v-select", vSelect);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
