<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import Swal from 'sweetalert2';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  dob: string;
  mobile_num: string;
  address: string;
}


export default defineComponent({
  data() {
    return {
      data: [] as User[],
      search: "",
      isLoading: false,
      currentPage: 1,
      totalPages: 0,
      limit: 10,
      selectedSortBy: "",
      selectedOrder: "",
      error: "" as string | null,
    };
  },
  methods: {
    // Show All Data
    async fetchData() {
      this.isLoading = true;

      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          params: {
            query: this.search,
            sortBy: this.selectedSortBy,
            order: this.selectedOrder,
            page: this.currentPage,
            limit: this.limit,
          },
        });
        // this.data = response.data.data;
        this.data = response.data.data.formattedRows;
        this.totalPages = Math.ceil(response.data.data.totalUsers / this.limit);
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      } catch (error) {
        this.error = "There was an error fetching the data: " + (error as Error).message;
        this.isLoading = false;
      }
    },

    // Delete Data
    async deleteItem(id: number) {
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
              iconColor: "#dc143c",
              confirmButtonColor: "#0953B5",
            });
            this.fetchData();
          }
        });
      } catch (error) {
        this.error = "There was an error fetching the data: " +(error as Error).message;
      }
    },

    handleSearch() {
      this.currentPage = 1;
      this.fetchData();
    },

    handleFilterChange() {
      this.currentPage = 1;
      this.fetchData();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchData();
      }
    },
    changePage(page: number) {
      this.currentPage = page;
      this.fetchData();
    },
  },
computed: {
  visiblePages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = 3;
    let start = Math.max(1, current - 1);
    let end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
},

  watch: {
    search: "handleSearch",
    selectedSortBy: "handleFilterChange",
    selectedOrder: "handleFilterChange",
  },
  mounted() {
    this.fetchData();
  },
});
</script>
<template>
  <!-- Table Data  -->
  <div
    v-if="isLoading"
    class="bg-gradient-to-br from-gray-900 to-blue-900 min-h-[calc(100vh-70px)]"
  >
    <div
      class="text-white flex justify-center items-center h-[calc(100vh-60px)]"
    >
      <p><i class="pi pi-spin pi-spinner" style="font-size: 5rem"></i></p>
    </div>
  </div>
  <main class="bg-gradient-to-br from-gray-900 to-blue-900" v-else-if="data">
    <main class="min-h-[calc(100vh-160px)]">
      <div class="container py-3">
        <div class="row">
          <div class="flex">
            <input
              type="search"
              v-model="search"
              class="search"
              placeholder="Search by Firstname & Lastname"
            />
            <select
              v-model="selectedSortBy"
              class="border-2 border-white ms-4 text-white bg-[#002F63] p-1 px-2"
            >
              <option value="">Select Sort By</option>
              <option value="first_name">First Name</option>
              <option value="dob">Date of Birth</option>
            </select>

            <select
              v-model="selectedOrder"
              class="border-2 border-white ms-4 text-white bg-[#002F63] p-1 px-2"
            >
              <option value="">Select Order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <h3 class="text-white text-2xl font-bold my-4">All Records</h3>
          <div class="overflow-x-auto">
            <table class="border-collapse w-full bg-white overflow-auto">
              <thead>
                <tr class="bg-blue-500 text-white">
                  <th class="border-[#002F63] hidden">id</th>
                  <th class="border border-[#002F63]">First Name</th>
                  <th class="border border-[#002F63] py-2">Last Name</th>
                  <th class="border border-[#002F63] py-2">Date of Birth</th>
                  <th class="border border-[#002F63] py-2">Mobile Number</th>
                  <th class="border border-[#002F63] py-2">Address</th>
                  <th class="border border-[#002F63] py-2">Actions</th>
                </tr>
              </thead>
              <tbody class="w-full" v-if="data.length > 0">
                <tr v-for="item in data" :key="item.id">
                  <td class="hidden">{{ item.id }}</td>
                  <td class="border border-[#002F63] px-2">
                    {{ item.firstname }}
                  </td>
                  <td class="border border-[#002F63] px-2">
                    {{ item.lastname }}
                  </td>
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
                    class="border border-[#002F63] px-2 flex justify-center flex-col md:flex-row pt-2"
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
                  <td
                    colspan="7"
                    class="text-center border border-[#002F63] p-4 font-bold"
                  >
                    <img
                      src="../assets/no result.png"
                      alt="No result Found"
                      class="mx-auto h-32"
                    />
                    <p class="mt-4">No data available</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <main class="py-5">
      <!-- Pagination  -->
      <div class="pagination flex justify-around">
        <ul class="flex justify-center cursor-pointer">
          <li @click="previousPage" class="hover:bg-blue-500">Previous</li>
          <!-- <li
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="{ active: page === currentPage }"
            class="hover:bg-blue-500"
          >
            {{ page }}
          </li> -->
          <li
  v-for="page in visiblePages"
  :key="page"
  @click="changePage(page)"
  :class="{ active: page === currentPage }"
  class="hover:bg-blue-500"
>
  {{ page }}
</li>

          <li @click="nextPage" class="hover:bg-blue-500">Next</li>
        </ul>

        <ul class="flex items-center p-2">
          <label for="my-select" class="text-white me-4">Page :</label>
          <select
            id="my-select"
            class="bg-blue-500 cursor-pointer p-1 text-white border-2 border-white"
            v-model="currentPage"
            @change="changePage(currentPage)"
          >
            <option v-for="page in totalPages" :key="page" :value="page">
              {{ page }}
            </option>
          </select>
        </ul>
      </div>
    </main>
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
  background-color: #2b7fff;
}
</style>
