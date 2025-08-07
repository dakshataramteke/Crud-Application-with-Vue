<script>
import axios from "axios";
export default {
  data() {
    return {
      showModel: false,
      formData: {
        fname: "",
        lname: "",
        dob: "",
        mobilenumber: "",
        address: "",
      },
    };
  },
  methods: {

    // Submitting the data 
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/users",
          this.formData
        );
        console.log("Response is", response);
        alert("Form is Submitted");

        this.formData = {
          fname: "",
          lname: "",
          dob: "",
          mobilenumber: "",
          address: "",
        };
      } catch (err) {
        console.error(err);
      }
    },

  
},
}
</script>
<template>
  <!-- Registration Form  -->
  <main class="bg-[#002F63] h-screen">
    <form @submit.prevent="handleSubmit">
      <div class="container py-3">
        <div class="row">
          <div class="form-wrapper bg-white p-5 shadow-xl-amber-50">
            <h2 class="text-2xl font-bold text-center my-3 text-[#002F63]">
              Registration
            </h2>

            <label>First Name</label><br />
            <input
              type="text"
              v-model="formData.fname"
              class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
            /><br />
            <label>Last Name</label><br />
            <input
              type="text"
              v-model="formData.lname"
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
              v-model="formData.mobilenumber"
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
                class="cursor-pointer bg-[#2b6abc] text-white"
              >
                Submit
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

</style>
