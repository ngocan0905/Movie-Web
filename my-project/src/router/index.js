import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/movie",
    name: "movie",
    component: import("../views/MoviesPage.vue"),
  },
  {
    path: "/movie/:id",
    name: "detail",
    component: () => import("../views/MovieDetail.vue"),
  },
  {
    path: "/series",
    name: "series",
    component: import("../views/SeriesPage.vue"),
  },
  {
    path: "/tv-show",
    name: "tv-show",
    component: import("../views/TvShowsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
