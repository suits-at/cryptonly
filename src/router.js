import Vue from "vue";
import Router from "vue-router";
import Table from "./views/Ticker.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "table",
      component: Table,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "profile" */ "./views/Profile.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () =>
        import(/* webpackChunkName: "settings" */ "./views/Settings.vue"),
    },
    {
      path: "/watchList",
      name: "watchList",
      component: () =>
        import(/* webpackChunkName: "watchList" */ "./views/WatchList.vue"),
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: () =>
        import(/* webpackChunkName: "portfolio" */ "./views/Portfolio.vue"),
    },
    {
      path: "/top100",
      name: "top100",
      component: () =>
        import(/* webpackChunkName: "portfolio" */ "./views/Top100.vue"),
    },
  ],
});
