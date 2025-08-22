<script>
import axios from "axios";
export default {
  data() {
    return {
      showModel: false,
      UpdateUserId: "",
      formData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        mobileNumber: "",
        address: "",
      },
    };
  },

  mounted() {
    this.UpdateUserId = this.$route.params.id;
    this.getUserData(this.$route.params.id);
  },

  methods: {
    closeForm() {
      this.showModel = false;
      this.$router.push("/users");
    },

    // Get Edit User
    async getUserData(UserId) {
      const response = await axios.get(
        `http://localhost:3000/api/users/${UserId}/edit`
      );
      console.log("Response Edit ", response);
      this.formData.firstName = response.data.data[0].firstname;
      this.formData.lastName = response.data.data[0].lastname;
      this.formData.dateOfBirth = response.data.data[0].dateOfBirth
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");
      this.formData.mobileNumber = response.data.data[0].mobile_num;
      this.formData.address = response.data.data[0].address;
    },

    async updateUser() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${this.UpdateUserId}/edit`,
          this.formData
        );
        console.log(response.data);
        Swal.fire({
          title: "Successfully",
          text: "Edit Successfully",
          icon: "success",
          iconColor:'#1a9922',
          confirmButtonColor: '#0953B5'
       
        });
        this.$router.push("/users");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<template>
  <!-- Edit Table  -->
  <main class="bg-[#002F63] min-h-[calc(100vh-60px)]">
    <div class="EditTable">
      <form @submit.prevent="updateUser">
        <div class="container py-3">
          <div class="row">
            <div class="form-wrapper bg-white p-5 shadow-xl-amber-50">
              <h2 class="text-2xl font-bold text-center my-2 text-[#002F63]">
                Edit Form
                <span @click="closeForm" class="cross">X</span>
              </h2>
              <div>
                <label
                  >First Name <span class="text-red-700 ms-1">*</span></label
                ><br />
                <input
                  type="text"
                  v-model="formData.firstName"
                  class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
                />
              </div>

              <div>
                <label>Last Name <span class="text-red-700 ms-1">*</span></label
                ><br />
                <input
                  type="text"
                  v-model="formData.lastName"
                  class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
                />
              </div>

              <div>
                <label
                  >Date of Birth <span class="text-red-700 ms-1">*</span></label
                ><br />
                <input
                  type="date"
                  v-model="formData.dateOfBirth"
                  class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
                />
              </div>

              <div>
                <label
                  >Mobile Number <span class="text-red-700 ms-1">*</span></label
                ><br />
                <input
                  type="text"
                  v-model="formData.mobileNumber"
                  class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
                />
              </div>

              <div>
                <label>Address <span class="text-red-700 ms-1">*</span></label
                ><br />
                <textarea
                  name=""
                  id=""
                  v-model="formData.address"
                  class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
                ></textarea>
              </div>

              <div class="flex justify-center">
                <button
                  type="submit"
                  class="cursor-pointer bg-[#1e8720] text-white"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<style scoped>
.container {
  margin: 0 auto;
}
.form-wrapper {
  border-radius: 10px;
  width: 40%;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .form-wrapper {
    width: 100%;
  }
}

.form-wrapper button {
  padding: 0.75rem 1.25rem;
  margin: 0.825rem 0;
}

.form-wrapper .cross {
  color: black;
  float: right;
  cursor: pointer;
}
/* ok Button Color  */
div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){
  background-color: #2b6abc !important;
}
</style>
