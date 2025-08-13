<script>
import { RouterView } from "vue-router";
import CreateForm from "./Components/CreateForm.vue";
import Home from "./Components/Home.vue";
import EditForm from "./Components/EditForm.vue";
import AllData from "./Components/AllData.vue";

export default {
  data() {
    return {
      Home,
      CreateForm,
      AllData,
      EditForm,
    };
  },
};
</script>

<template>
  <header>
    <nav class="bg-blue-500">
      <div class="container flex items-center h-[60px]">
        <!-- <router-link to="/"
          ><h4 class="text-2xl text-white font-bold me-18 md:me-24">
            Crud
          </h4></router-link
        > -->

        <ul class="flex">
           <li>
            <RouterLink to="/api/users" class="text-white font-bold">
              <span>Users</span></RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/api/users/create"
              class="mx-4 text-white font-bold"
            >
              <span> Create</span></RouterLink
            >
          </li>
         
        </ul>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.container {
  margin: 0 auto;
}
span {
  position: relative;
}
span::after {
  position: absolute;
  content: "";
  height: 2px;
  width: 0%;
  left: 0;
  bottom: -5px;
  background-color: white;
  transition: all 0.3s ease-in-out;
}
span:hover::after {
  width: 100%;
}
</style>
