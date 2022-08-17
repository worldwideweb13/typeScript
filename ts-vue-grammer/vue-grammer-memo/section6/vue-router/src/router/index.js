import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookList from "../views/BookList.vue";
import BookDetail from "@/components/BookDetail.vue";
import Item from "@/components/Item.vue";
import NotFound from "@/components/NotFound.vue";
import User from "@/views/User.vue";
import UserProfile from "@/components/UserProfile.vue";
import UserPost from "@/components/UserPost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/book",
    name: "BookList",
    component: BookList,
  },
  {
    path: "/book/:id",
    name: "Book",
    component: BookDetail,
    props: (route) => ({
      id: Number(route.params.id),
      author: route.params.author,
      title: route.params.title,
    }),
  },
  {
    path: "/item/:id",
    name: "Item",
    component: Item,
  },
  {
    path: "/user",
    component: User,
    children: [
      {
        path: "profile",
        component: UserProfile,
      },
      {
        path: "post",
        component: UserPost,
      },
    ],
  },
  {
    path: "*",
    // redirect: "/",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
