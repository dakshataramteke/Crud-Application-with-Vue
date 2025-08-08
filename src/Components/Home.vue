<script>
export default{
    data(){
        return{
            showmodel:false
        }
    },
    methods:{
     openForm() {
        this.showmodel= false,
        this.$router.push('/api/users/create'); 
   
},
},
}

</script>
<template>
    <main class="bg-[#002F63]">
         <div class="container w-full flex items-center justify-center h-[calc(100vh-60px)]">
        <div class="row">
            <div class="text-center">
            <h4 class="text-3xl font-bold my-3 text-white"> Crud Application</h4>
            <button class="cursor-pointer bg-[#2b6abc] text-white hover:bg-[#0e64c6] font-bold" @click="openForm()">Start </button>
            </div>
        </div>
    </div>
    </main>
   
</template>
<style scoped>
button{
  padding: 0.75rem 1.25rem;
  margin: 0.825rem 0;
}
</style>