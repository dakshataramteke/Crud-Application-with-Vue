<script lang="ts">
import { RouterView, RouterLink, useRoute,useRouter } from "vue-router";
import { defineComponent } from "vue";
import api from '../axios';
import CreateForm from "./CreateForm.vue";
import EditForm from "./EditForm.vue";
import AllData from "./AllData.vue";
import "primeicons/primeicons.css";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    CreateForm,
    AllData,
    EditForm,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },
  methods:{
  async logOut(){
  const response = api.post("/admin/logout");
  console.log(response);
  Swal.fire({
  title: "Successfully",
  text: "Log out Successfully!",
  icon: "success",
   iconColor: "#1a9922",
    confirmButtonColor: "#0953B5",
});
  this.router.push("/login");
}
  }
});
</script>

<template>
  <header>
    <nav class="bg-blue-500">
      <div class="container flex items-center h-[60px]">
        <ul class="flex justify-between w-full">
        <div class="flex">
          <li class="list-none">
            <RouterLink to="/users" class="text-white font-bold">
              <span>Users</span></RouterLink
            >
          </li>
          <li class="list-none">
            <RouterLink to="/users/create" class="mx-4 text-white font-bold">
              <span> Create</span></RouterLink
            >
          </li>

        
        </div>

        <div class="flex">
                 <li class="list-none cursor-pointer mx-4 text-white font-bold" @click="logOut">
         <span>Log Out</span>
          </li>
        </div>
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