import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/movie",
    name: "movie",
    component: () => import("../views/MoviesPage.vue"),
  },
  {
    path: "/movie/:id",
    name: "movie-detail",
    component: () => import("../views/MovieDetail.vue"),
  },
  {
    path: "/tv",
    name: "tv",
    component: () => import("../views/SeriesPage.vue"),
  },
  {
    path: "/tv/:id",
    name: "tv-detail",
    component: () => import("../views/TvDetail.vue"),
  },
  {
    path: "/people",
    name: "people",
    component: () => import("../views/PeoplePage.vue"),
  },
  {
    path: "/people/:id",
    name: "people-detail",
    component: () => import("../views/PeopleDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
