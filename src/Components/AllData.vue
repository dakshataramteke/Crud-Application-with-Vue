<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      search: "",
      currentPage: 1,
      itemsPerPage: 5, // how many item do you want to display in one Page
      selectedOption: "",
      activeIndex: 1
    };
  },
  methods: {
    // Show All Data
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        this.data = response.data.data;
      } catch (error) {
        this.error = "There was an error fetching the data: " + error.message;
      }
    },

    // Delete Data
    async deleteItem(id) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/${id}/delete`
        );
        console.log(response.data);
        Swal.fire({
          title: "Are you sure?",
          text: "Are you want to Delete",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#2b6abc",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      } catch (error) {
        this.error = "There was an error fetching the data: " + error.message;
      }
    },

    // Page No 
    changePage(page) {
      this.currentPage = page;
       this.activeIndex = page;
    },

    // Filtering of Ascending Order
   SelectFilter() {
  console.log("Asc Called");
  if (this.selectedOption === "firstName") {
    this.data.sort((a, b) => {
      const nameA = a.firstname.toLowerCase();
      const nameB = b.firstname.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

if (this.selectedOption === "dob") {
      this.data.sort((a, b) => {
        const dateA = new Date(a.dateOfBirth.split('-').reverse().join('-'));
        const dateB = new Date(b.dateOfBirth.split('-').reverse().join('-'));
        return dateA - dateB;
      });
    }
}

  },

  computed: {
    //Search the item
    filteredData() {
      return this.data.filter((s) => {
        return s.firstname.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },

    // Total pages
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<template>
  <!-- Table Data  -->
  <main class="bg-[#002F63] min-h-[calc(100vh-160px)]">
    <div class="container py-3">
      <div class="row">
        <div class="flex" >
          <input
            type="search"
            v-model="search"
            class="search"
            placeholder="Search by Firstname"
          />
          <select
            v-model="selectedOption"
            class="border-2 border-white ms-4 text-white bg-[#002F63] p-1"  @change="SelectFilter"  
          >
          <option value="">Select</option>
            <option value="firstName" >First Name</option>
            <option value="dob">Date of Birth</option>
          </select>
        </div>

        <h3 class="text-white text-2xl font-bold my-4">All Records</h3>
        <div class="overflow-x-auto">
          <table class="border-collapse w-full bg-white overflow-auto">
            <thead>
              <tr class="bg-blue-400">
                <th class="border-[#002F63] hidden">id</th>
                <th class="border border-[#002F63]">First Name</th>
                <th class="border border-[#002F63] py-2">Last Name</th>
                <th class="border border-[#002F63] py-2">Date of Birth</th>
                <th class="border border-[#002F63] py-2">Mobile Number</th>
                <th class="border border-[#002F63] py-2">Address</th>
                <th class="border border-[#002F63] py-2">Actions</th>
              </tr>
            </thead>
            <tbody class="w-full" v-if="paginatedData.length > 0">
              <tr v-for="item in paginatedData" :key="item.id">
                <td class="hidden">{{ item.id }}</td>
                <td class="border border-[#002F63] px-2">
                  {{ item.firstname }}
                </td>
                <td class="border border-[#002F63] px-2">
                  {{ item.lastname }}
                </td>
                <td class="border border-[#002F63] px-2">
                  <!-- {{ item.dob.slice(0, 10).split('-').reverse().join('-')}}                                       -->
                  {{ item.dateOfBirth }}
                </td>
                <td class="border border-[#002F63] px-2">
                  {{ item.mobile_num }}
                </td>
                <td class="border border-[#002F63] px-2">
                  {{ item.address }}
                </td>
                <td
                  class="border border-[#002F63] px-2 flex justify-center flex-col md:flex-row"
                >
                  <button>
                    <RouterLink
                      :to="{ path: '/users/' + item.id + '/edit' }"
                      class="mr-2 p-1 m-1 bg-[#2b6abc] text-white px-2 cursor-pointer"
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
            <tbody v-else>
              <tr>
                <td colspan="7" class="text-center border border-[#002F63] p-4 font-bold">
                  <img src="../assets/no result.png" alt="No result Found" class="mx-auto h-32">
                 <p class="mt-4">No data available</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

<main class="bg-[#002F63] py-5">
     <!-- Pagination  -->
      <div class="pagination">
        <ul class="flex justify-center">
          <li
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="cursor-pointer"
            :class="{ 'active': page === activeIndex }"
          >
            {{ page }}
          </li>

        </ul>
      </div>
  </main>
</template>

<style scoped>
.container {
  margin: 0 auto;
}
.search {
  border: 2px solid white;
  padding: 8px;
  width: 100%;
}
::placeholder {
  color: white;
  padding: 10px;
}
.search:focus {
  color: white;
  padding-left: 6px;
  border: none;
}
li {
  list-style: none;
  color: white;
  padding: 5px 10px;
  border: 2px solid white;
  margin: 10px;
}
.active {
   font-weight: bold;
  background-color: #2B7FFF;
    }
</style>
