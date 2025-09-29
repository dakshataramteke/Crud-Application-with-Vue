import CreateForm from "@/Components/CreateForm.vue";
import EditForm from "@/Components/EditForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import AllData from "@/Components/AllData.vue";
import Navbar from "../src/Components/Navbar.vue";
import LoginPage from "../src/pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: LoginPage },
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
export default router;
