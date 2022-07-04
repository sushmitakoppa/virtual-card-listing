import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/user/profile",
  },
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
    children: [
      {
        path: "profile",
        component: () => import("../views/UserProfileCard.vue"),
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "all",
        component: () => import("../views/UserAllCard.vue"),
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "blocked",
        component: () => import("../views/UserBlockedCard.vue"),
      },
    ],
    redirect: "/user/profile",
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
