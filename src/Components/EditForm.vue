<script>
import axios from "axios";
export default {
  data() {
    return {
      showModel:false,
      UpdateUserId: "",
      formData: {
        firstname: "",
        lastname: "",
        dob: "",
        mobile_num: "",
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
      this.$router.push('/alldata'); 
   
    },
    async getUserData(UserId) {
      const response = await axios.get(
        `http://localhost:3000/api/users/${UserId}/edit`
      );
      console.log("Response", response);
      this.formData.firstname = response.data.data[0].firstname;
      this.formData.lastname = response.data.data[0].lastname;
      this.formData.dob = response.data.data[0].dob;
      this.formData.mobile_num = response.data.data[0].mobile_num;
      this.formData.address = response.data.data[0].address;
    },

    async updateUser() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${this.UpdateUserId}/edit`,
          this.formData
        );
        console.log(response.data);
        alert("Edit Successfully")
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<template>
  <!-- Edit Table  -->
  <main class="bg-[#002F63] h-screen">
    <div class="EditTable">
      <form @submit.prevent="updateUser">
        <div class="container py-3">
          <div class="row">
            <div class="form-wrapper bg-white p-5 shadow-xl-amber-50">
              <h2 class="text-2xl font-bold text-center my-2 text-[#002F63]">
                Edit Form
                <span @click="closeForm">X</span>
              </h2>

              <label>First Name</label><br />
              <input
                type="text"
                v-model="formData.firstname"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              /><br />
              <label>Last Name</label><br />
              <input
                type="text"
                v-model="formData.lastname"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              /><br />
              <label>Date of Birth</label><br />
              <input
                type="date"
                v-model="formData.dob"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              /><br />
              <label>Mobile Number</label><br />
              <input
                type="text"
                v-model="formData.mobile_num"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              /><br />
              <label>Address</label><br />
              <textarea
                name=""
                id=""
                v-model="formData.address"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              ></textarea>
              <br />
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

.form-wrapper span {
  color: black;
  float: right;
  cursor: pointer;
}
</style>
