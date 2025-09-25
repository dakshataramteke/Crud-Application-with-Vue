import CreateForm from "@/Components/CreateForm.vue";
import EditForm from "@/Components/EditForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import AllData from "@/Components/AllData.vue";
import Login from "@/Components/Admin/Login.vue";
import Navbar from "../src/Components/Navbar.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/", name: "login", component: Login },
    { path: "/login", name: "login", component: Login },
    { path: "/", redirect: "/login" },
    {
      path: "/users", 
      component:Navbar,
      name: "users-route",
      children: [
         {
          path: "",
          name: "users",
          component: AllData,
          meta: { requiresAuth: true },
        },
        {
          path: "create",
          component: CreateForm,
          meta: { requiresAuth: true },
        },
       
        {
          path: ":id/edit",
          component: EditForm,
          name: "edit-users",
          meta: { requiresAuth: true },
        },
      ],
    },
  ],

});

// router.beforeEach((to, from, next) => {

//   if (to.meta.requiresAuth) {
//     next("/login");
//   } else if (to.path === "/login") {
//     next("/users"); 
//   } else {
//     next();
//   }
// });

export default router;
