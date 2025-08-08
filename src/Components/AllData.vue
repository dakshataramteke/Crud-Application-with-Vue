<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
     
    // Show All Data
    async fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/alldata"
        );
        this.data = response.data;
        console.log(response.data);
      } catch (error) {
        this.error = "There was an error fetching the data: " + error.message;
      }
    },

    // Delete Data
    async deleteItem(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/${id}`);
        console.log(response.data);
        this.items = this.items.filter((item) => item.id !== id);
        // alert("Deleted Data");
      } catch (err) {
        console.error(err);
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<template>
  <!-- Table Data  -->
  <main class="bg-[#002F63]  min-h-[calc(100vh-60px)]">
    <div class="container py-3">
      <div class="row">
        <h3 class="text-center text-white text-2xl font-bold my-4">
          All Records
        </h3>
        <div class="overflow-x-auto">
          <table
            class="border-collapse w-full bg-white overflow-auto "
          >
            <thead>
              <tr class="bg-blue-400">
                <th class=" border-[#002F63] hidden">id</th>
                <th class="border border-[#002F63]">First Name</th>
                <th class="border border-[#002F63] py-2">Last Name</th>
                <th class="border border-[#002F63] py-2">Date of Birth</th>
                <th class="border border-[#002F63] py-2">Mobile Number</th>
                <th class="border border-[#002F63] py-2">Address</th>
                <th class="border border-[#002F63] py-2">Actions</th>
              </tr>
            </thead>
            <tbody class="w-full">
              <tr v-for="item in data" :key="item.id">
                <td class="hidden">{{ item.id }}</td>
                <td class="border border-[#002F63] px-2 ">
                  {{ item.firstname }}
                </td>
                <td class="border border-[#002F63] px-2">{{ item.lastname }}</td>
                <td class="border border-[#002F63] px-2">
  
                  {{ item.dob.slice(0, 10).split('-').reverse().join('-')}}
                </td>
                <td class="border border-[#002F63] px-2">
                  {{ item.mobile_num }}
                </td>
                <td class="border border-[#002F63] px-2">
                  {{ item.address }}
                </td>
                <td
                  class="border border-[#002F63] px-2 flex justify-center flex-col md:flex-row "
                >
                  <button>
                    <RouterLink
                      :to="{ path: '/api/users/' + item.id + '/edit' }"
                      class="mr-2 p-1 m-1 bg-[#2b6abc] text-white px-2 cursor-pointer "
                      >Edit</RouterLink
                    >
                  </button>

                  <button
                    class="text-white p-1 m-1 bg-red-500 px-2 cursor-pointer"
                    @click="deleteItem(item.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
.container {
  margin: 0 auto;
}
</style>
