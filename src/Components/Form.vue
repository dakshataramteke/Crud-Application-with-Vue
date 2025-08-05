<script>
import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        fname: "",
        lname: "",
        dob: "",
        mobilenumber: "",
        address: "",
      },
      data: [],
    };
  },
  methods:{
 async handleSubmit(){
  const response = await axios.post("http://localhost:3000/submitform", this.formData);
  console.log("Response is",response);
  alert("Form is Submitted");

  this.formData = {
    fname: "",
    lname: "",
    dob: "",
    mobilenumber: "",
    address: "",
   };
  },

  async fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/alldata'); 
      this.data = response.data; 
    } catch (error) {
      this.error = "There was an error fetching the data: " + error.message;
    } 
  }
 },
  created() {
    this.fetchData(); 
  }

};
</script>
<template>
  <main class="bg-[#002F63]">
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

  <main class="bg-[#002F63]">
    <div class="container py-3">
      <div class="row">
        <table class="border-collapse border border-gray-400 w-full bg-white">
          <thead>
            <tr>
              <th class="border border-gray-300">First Name</th>
              <th class="border border-gray-300 py-2">Last Name</th>
              <th class="border border-gray-300 py-2">Date of Birth</th>
              <th class="border border-gray-300 py-2">Mobile Number</th>
              <th class="border border-gray-300 py-2">Address</th>
              <th class="border border-gray-300 py-2">Actions</th>
            </tr>
          </thead>
          <tbody class="w-full">
            <tr v-for="item in data" :key="item.id">
              <td class="border border-gray-300 px-2">{{ item.firstname }}</td>
              <td class="border border-gray-300 px-2">{{ item.lastname }}</td>
              <td class="border border-gray-300 px-2">{{ item.dob.slice(0, 10) }}</td>
              <td class="border border-gray-300 px-2">
                {{ item.mobile_num }}
              </td>
              <td class="border border-gray-300 px-2">
                {{ item.address }}
              </td>
              <td
                class="border border-gray-300 px-2 flex justify-center flex-col md:flex-row"
              >
                <button
                  class="mr-2 p-1 m-1 bg-[#2b6abc] text-white px-2 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  class="text-white p-1 m-1 bg-red-500 px-2 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
</style>
