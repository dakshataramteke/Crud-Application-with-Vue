<script lang="ts">
import { defineComponent } from "vue";
import type { login, LoginError } from "../../types/admin";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";
import api from '../../axios';

export default defineComponent({
  data() {
    return {
      formData: {
        email: '',
        password: ''
      } as login,
      showPassword: false,
      errors: {} as LoginError
    }
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },
  methods: {
    // Toggle Password 
    togglePassword() {
      this.showPassword = !this.showPassword;
        },
    async handleSubmit(): Promise<void> {
      this.errors = {};

      if (!this.formData.email) {
        this.errors.email = "Email is required";
      }
      if (!this.formData.password) {
        this.errors.password = "Password is required";
      }

      if (this.formData.email && this.formData.password) {
        try {
          const response = await api.post("admin/login", this.formData);
          console.log("Login Response", response)
          await Swal.fire({
            title: "Successfully",
            text: "Login Successful",
            icon: "success",
            iconColor: "#1a9922",
            confirmButtonColor: "#0953B5",
          });
            const role:string = response.data.roleData;
          console.log("The Role of Login", role)
          if(response.data.success){
           
          this.router.push("/users");
            // this.router.push({ path: "/users", query: { role } });
          }
         
          this.formData = {
            email: '',
            password: ''
          };
        } catch (error) {
          if (error as Error) {
            //  console.error("Login error:", error.response ? error.response.data : error.message);
             console.error("Login error:", error);
          
            await Swal.fire({
              title: "Error",
              // text: error.response?.data?.message || "Please Check Email and Password",
              text: "Please Check Email and Password",
              icon: "error",
              iconColor: "#dc143c",
              confirmButtonColor: "#0953B5",
            });
          }
          console.log(error as Error);
        }
      }
    },
  }

});
</script>
<template>
  <main class="bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen">
    <form @submit.prevent="handleSubmit">
      <div class="container">
        <div class="row flex h-screen">
          <div class="login-img">
            <img src="../../assets/login3.png" alt="" class="img">
          </div>
          <div class="form-wrapper bg-white p-5 shadow-xl-amber-50">
            <h2 class="text-2xl font-bold text-center my-5 text-[#002F63]">
              Login
            </h2>

            <div>
              <label>Email <span class="text-red-700 ms-1">*</span></label><br />
              <input type="email" v-model="formData.email"
                class="border border-[#002F63] p-1 my-2 focus:outline-none w-full" />
              <p v-if="errors.email" class="text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <div class="mt-2">
              <label>Password <span class="text-red-700 ms-1">*</span></label><br />
              <div class="flex relative">
                <input :type="showPassword ? 'text' : 'password'" v-model="formData.password"
                  class="border border-[#002F63] p-1 my-2 focus:outline-none w-full" />
                <i :class="showPassword ? 'pi pi-eye' : 'pi pi-eye-slash'" @click="togglePassword"></i>
              </div>


              <p v-if="errors.password" class="text-red-500">
                {{ errors.password }}
              </p>
            </div>

            <div class="flex justify-center">
              <button type="submit" class="cursor-pointer bg-[#2b6abc] hover:bg-[#0953b5] text-white my-3">
                Login
              </button>
            </div>

          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<style scoped>
.container {
  margin: 0 auto;
}

@media(max-width:768px) {
  .row {
    flex-direction: column;
  }
}

.login-img {
  /* border:2px solid rgb(60, 184, 128); */
  height: 100%;

  .img {
    width: 100%;
    height: 100%;
  }
}

.form-wrapper {
  width: 50%;
  height: 100%;
  padding: 6rem 1.2rem;
}

/* Eye  */
.pi {
  position: absolute;
  top: 30%;
  right: 3%;
  font-size: 1.2rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-wrapper {
    width: 100%;
    padding: 2rem 1.2rem;
  }
}

.form-wrapper button {
  padding: 0.75rem 1.25rem;
  margin: 0.825rem 0;
}

/* ok Button Color  */
div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm) {
  background-color: #2b6abc !important;
}
</style>
