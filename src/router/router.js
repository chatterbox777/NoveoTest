import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dogs from "../components/Dogs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorite",
    name: "Favorite",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Favorite.vue"),
  },
  {
    path: "/dogs",
    name: "Dogs",
    component: Dogs,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
