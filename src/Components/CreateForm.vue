<script>
import axios from "axios";
export default {
  data() {
    return {
      showModel: false,
      formData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        mobileNumber: "",
        address: "",
      },
      errors: [],
    };
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr)
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");
    },
    // Submitting the data
    async handleSubmit() {
      this.errors = [];
      if (!this.formData.firstName) {
        this.errors.firstName = "First Name is Required";
      }
      if (!this.formData.lastName) {
        this.errors.lastName = "Last Name is Required";
      }
      if (!this.formData.dateOfBirth) {
        this.errors.dateOfBirth = "Date of Birth is Required";
      }
      if (!this.formData.mobileNumber) {
        this.errors.mobileNumber = "Mobile Number is Required";
      }
      if (!this.formData.address) {
        this.errors.address = "Address is Required";
      }
      console.warn("Error", this.errors);

      if (
        this.formData.firstName &&
        this.formData.lastName &&
        this.formData.dateOfBirth &&
        this.formData.mobileNumber &&
        this.formData.address
      ) {
        this.formData.dateOfBirth = this.formatDate(this.formData.dateOfBirth);
        try {
          const response = await axios.post(
            "http://localhost:3000/api/users/create",
            this.formData
          );

          console.log("Response is", this.formData);
          console.log("Date is ", response.data);
          Swal.fire({
            title: "Successfully",
            text: "New User Created",
            icon: "success",
            iconColor:'#1a9922',
            confirmButtonColor: '#0953B5'
          });

          this.formData = {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            mobileNumber: "",
            address: "",
          };
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
<template>
  <!-- Registration Form  -->
  <main class="bg-gradient-to-br from-gray-900 to-blue-900 min-h-[calc(100vh-60px)]">
    <form @submit.prevent="handleSubmit">
      <div class="container py-3">
        <div class="row">
          <div class="form-wrapper bg-white p-5 shadow-xl-amber-50">
            <h2 class="text-2xl font-bold text-center my-3 text-[#002F63]">
              Registration
            </h2>

            <div>
              <label>First Name <span class="text-red-700 ms-1">*</span></label
              ><br />
              <input
                type="text"
                v-model="formData.firstName"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              />
              <p v-if="errors.firstName" class="text-red-500">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label>Last Name <span class="text-red-700 ms-1">*</span></label
              ><br />
              <input
                type="text"
                v-model="formData.lastName"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              />
              <p v-if="errors.lastName" class="text-red-500">
                {{ errors.lastName }}
              </p>
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
              <p v-if="errors.dateOfBirth" class="text-red-500">
                {{ errors.dateOfBirth }}
              </p>
            </div>

            <div>
              <label
                >Mobile Number <span class="text-red-700 ms-1">*</span></label
              >
              <input
                type="text"
                v-model="formData.mobileNumber"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              />
              <p v-if="errors.mobileNumber" class="text-red-500">
                {{ errors.mobileNumber }}
              </p>
            </div>

            <div>
              <label>Address <span class="text-red-700 ms-1">*</span></label>
              <textarea
                name=""
                id=""
                v-model="formData.address"
                class="border border-[#002F63] p-1 my-1.5 focus:outline-none w-full"
              ></textarea>
              <p v-if="errors.address" class="text-red-500">
                {{ errors.address }}
              </p>
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="cursor-pointer bg-[#2b6abc] hover:bg-[#0953b5] text-white"
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

/* ok Button Color  */
div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){
  background-color: #2b6abc !important;
}
</style>
